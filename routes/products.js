import express from 'express';
import productsRepo from '../repositories/products.js';
import productsIndexTemplate from '../views/products/index.js';

const router = express.Router();

// Route to handle the root path of the products. It fetches all products from the repository.
router.get('/', async (req, res) => {
    // Calls the getAll method from the products repository to retrieve all products
    const products = await productsRepo.getAll();
    // Sends the retrieved products to the products index template for rendering
    res.send(productsIndexTemplate({ products }));
});

export default router; // Exports the router for use in the main application file
