// Import necessary modules from node packages and local files
import express from 'express';
import { handleErrors } from './middlewares.js'; // Middleware for handling errors
import usersRepo from '../../repositories/users.js'; // User repository for data interaction
import signupTemplate from '../../views/admin/auth/signup.js'; // HTML template for signup
import signinTemplate from '../../views/admin/auth/signin.js'; // HTML template for signin
import {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  requireValidPasswordForUser
} from './validators.js'; // Validation middleware for forms

// Create a new router object to handle authentication routes
const router = express.Router();

// Route to display the signup page
router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
});

// Route to process the signup form
router.post('/signup', [requireEmail, requirePassword, requirePasswordConfirmation], handleErrors(signupTemplate), async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.create({ email, password }); // Create a new user in the repository

    req.session.userId = user.id; // Set user session ID for authentication

    res.redirect('/admin/products'); // Redirect to admin products page after signup
});

// Route to handle user signout
router.get('/signout', (req, res) => {
    req.session = null; // Clear the user session
    res.send('You are logged out!'); // Send a logout confirmation
});

// Route to display the signin page
router.get('/signin', (req, res) => {
    res.send(signinTemplate({})); // Send the signin template to the client
});

// Route to process the signin form
router.post('/signin', [requireEmailExists, requireValidPasswordForUser], handleErrors(signinTemplate), async (req, res) => {
    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email }); // Retrieve user by email

    req.session.userId = user.id; // Set user session ID for authentication

    res.redirect('/admin/products'); // Redirect to admin products page after signin
});

// Export the router to be used in other parts of the application
export default router;