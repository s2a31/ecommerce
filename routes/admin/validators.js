// Import necessary functions from express-validator and local user repository for validation
import { check } from 'express-validator';
import usersRepo from '../../repositories/users.js';

// Validator to ensure the title field is trimmed and within specified length limits
export const requireTitle = check('title')
    .trim() // Remove whitespace from both ends of a string
    .isLength({ min: 5, max: 40 }) // Ensure string length is between 5 and 40 characters
    .withMessage('Must be between 5 and 40 characters');

// Validator to ensure the price field is a float and greater than 1
export const requirePrice = check('price')
    .trim() // Remove whitespace from both ends of a string
    .toFloat() // Convert string to a float
    .isFloat({ min: 1 }) // Ensure the number is at least 1
    .withMessage('Must be a number greater than 1');

// Validator to ensure the email field is a valid email format and not already used
export const requireEmail = check('email')
    .trim() // Remove whitespace from both ends of a string
    .normalizeEmail() // Canonicalize an email address
    .isEmail() // Check if the input is an email
    .withMessage('Must be a valid email')
    .custom(async (email) => {
        const existingUser = await usersRepo.getOneBy({ email });
        if (existingUser) {
            throw new Error('Email in use'); // Custom error if email already exists
        }
    });

// Validator to ensure the password field is trimmed and within specified length limits
export const requirePassword = check('password')
    .trim() // Remove whitespace from both ends of a string
    .isLength({ min: 4, max: 20 }) // Check for length between 4 and 20 characters
    .withMessage('Must be between 4 and 20 characters');

// Validator to ensure password confirmation matches the password field
export const requirePasswordConfirmation = check('passwordConfirmation')
    .trim() // Remove whitespace from both ends of a string
    .isLength({ min: 4, max: 20 }) // Check for length between 4 and 20 characters
    .withMessage('Must be between 4 and 20 characters')
    .custom((passwordConfirmation, { req }) => {
        if (passwordConfirmation !== req.body.password) {
            throw new Error('Passwords must match'); // Custom error if passwords do not match
        } else {
            return true;
        }
    });

// Validator to ensure the provided email exists in the system before allowing login
export const requireEmailExists = check('email')
    .trim() // Remove whitespace from both ends of a string
    .normalizeEmail() // Canonicalize an email address
    .isEmail() // Check if the input is an email
    .withMessage('Must provide a valid email')
    .custom(async (email) => {
        const user = await usersRepo.getOneBy({ email });
        if (!user) {
            throw new Error('Email not found!'); // Custom error if email does not exist
        }
    });

// Validator to ensure the provided password is valid for the given user during login
export const requireValidPasswordForUser = check('password')
    .trim() // Remove whitespace from both ends of a string
    .custom(async (password, { req }) => {
        const user = await usersRepo.getOneBy({ email: req.body.email });
        if (!user) {
            throw new Error('Invalid password'); // Custom error if user is not found
        }
        const validPassword = await usersRepo.comparePasswords(user.password, password);
        if (!validPassword) {
            throw new Error('Invalid password'); // Custom error if password does not match
        }
    });
