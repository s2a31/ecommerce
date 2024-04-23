// Import the validationResult utility from express-validator to handle validation results
import { validationResult } from 'express-validator';

// Middleware to handle errors during form submission.
export const handleErrors = (templateFunc, dataCb) => {
    return async (req, res, next) => {
        const errors = validationResult(req); // Extract validation errors from the request
        
        // If errors are found, prepare and send the error response
        if (!errors.isEmpty()) {
            let data = {};
            // If dataCb is provided, call it to get additional data for the template
            if (dataCb) {
                data = await dataCb(req);
            }
            // Send the template with errors and any additional data
            return res.send(templateFunc({ errors, ...data }));
        }

        // If no errors, proceed to the next middleware
        next();
    };
};

// Middleware to require authentication.
export const requireAuth = (req, res, next) => {
    // Check if session userId is set, indicating an authenticated user
    if (!req.session.userId) {
        // If not authenticated, redirect to the signin page
        return res.redirect('/signin');
    }
    // If authenticated, proceed to the next middleware
    next();
};