// Import necessary modules and middleware from other files and packages
import express from 'express';
import multer from 'multer';  // multer for handling multipart/form-data for file uploads
import { handleErrors, requireAuth } from './middlewares.js'; // Custom middleware for error handling and authentication
import productsRepo from '../../repositories/products.js'; // Repository for products to interact with data storage
import productsNewTemplate from '../../views/admin/products/new.js'; // Template for new product page
import productsIndexTemplate from '../../views/admin/products/index.js'; // Template for listing all products
import productsEditTemplate from '../../views/admin/products/edit.js'; // Template for editing a product
import { requireTitle, requirePrice } from './validators.js'; // Validators for product title and price

const router = express.Router();  // Create a new router object to handle routes
const upload = multer({ storage: multer.memoryStorage() }); // Configure multer to use memory storage

// Route to display all products for admin
router.get('/admin/products', requireAuth, async (req, res) => {
    const products = await productsRepo.getAll(); // Fetch all products from the repository
    res.send(productsIndexTemplate({ products })); // Send the products to the index template for rendering
});

// Route to display the form for creating a new product
router.get('/admin/products/new', requireAuth, (req, res) => {
    res.send(productsNewTemplate({})); // Send an empty template for creating a new product
});

// Route to handle the submission of the new product form
router.post('/admin/products/new', requireAuth, upload.single('image'), [requireTitle, requirePrice], handleErrors(productsNewTemplate), async (req, res) => {
    const image = req.file.buffer.toString('base64'); // Convert uploaded image file to base64 string
    const { title, price } = req.body; // Destructure title and price from the form body
    await productsRepo.create({ title, price, image }); // Create a new product record in the repository

    res.redirect('/admin/products'); // Redirect to the products listing page
});

// Route to display the form for editing an existing product
router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
    const product = await productsRepo.getOne(req.params.id); // Fetch the product by ID

    if (!product) {
        return res.send('Product not found'); // Send an error message if no product found
    }

    res.send(productsEditTemplate({ product })); // Send the product to the edit template for rendering
});

// Route to handle the submission of the product edit form
router.post(
    '/admin/products/:id/edit',
    requireAuth,
    upload.single('image'),
    [requireTitle, requirePrice],
    handleErrors(productsEditTemplate, async (req) => {
        const product = await productsRepo.getOne(req.params.id); // Fetch the product again for concurrency
        return { product };
    }),
    async (req, res) => {
        const changes = req.body; // Get all form inputs as changes

        if (req.file) {
            changes.image = req.file.buffer.toString('base64'); // Update the image if a new one was uploaded
        }

        try {
            await productsRepo.update(req.params.id, changes); // Apply updates to the product in the repository
        } catch (err) {
            return res.send('Could not find item'); // Error handling for update operation
        }

        res.redirect('/admin/products'); // Redirect to the products listing page after update
    }
);

// Route to handle the deletion of a product
router.post('/admin/products/:id/delete', requireAuth, async (req, res) => {
    await productsRepo.delete(req.params.id); // Delete the product by ID

    res.redirect('/admin/products'); // Redirect to the products listing page after deletion
});

export default router; // Export the router for use in other parts of the application
