// Import necessary modules from node packages
import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

// Import routers for different parts of the application
import authRouter from './routes/admin/auth.js';
import adminProductsRouter from './routes/admin/products.js';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

// Initialize the express application
const app = express();

// Middleware to serve static files from 'public' directory
app.use(express.static('public'));

// Middleware to parse URL-encoded data with querystring library
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to handle session cookies
app.use(
    cookieSession({
        keys: ['r3gf6843f92fdggjdsdfg43'], // Secure key for signing the session cookie
    })
);

// Mount routers for different parts of the application
app.use(authRouter);               // Router for authentication routes
app.use(adminProductsRouter);      // Router for admin product management routes
app.use(productsRouter);           // Router for displaying products to users
app.use(cartsRouter);              // Router for shopping cart functionality

// Start the server on port 3000 and log that it is listening
app.listen(3000, () => {
    console.log('Listening');
});