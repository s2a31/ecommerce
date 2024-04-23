import express from 'express';
import cartsRepo from '../repositories/carts.js';
import productsRepo from '../repositories/products.js';
import cartShowTemplate from '../views/carts/show.js';

const router = express.Router();

// Route to handle adding a product to the cart
router.post('/cart/products', async (req, res) => {
    let cart;
    // Check if a cart exists in the session, if not, create a new one
    if (!req.session.cartId) {
        cart = await cartsRepo.create({ items: [] });
        req.session.cartId = cart.id;
    } else {
        // Retrieve existing cart
        cart = await cartsRepo.getOne(req.session.cartId);
    }

    // Check if the product already exists in the cart to increase quantity
    const existingItem = cart.items.find((item) => item.id === req.body.productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        // If not existing, push new product to cart
        cart.items.push({ id: req.body.productId, quantity: 1 });
    }
    await cartsRepo.update(cart.id, { items: cart.items });

    // Redirect to the cart page after adding product
    res.redirect('/cart');
});

// Route to display the cart and its items
router.get('/cart', async (req, res) => {
    // Redirect to home if there is no cart ID in the session
    if (!req.session.cartId) {
        return res.redirect('/');
    }

    // Retrieve the cart based on session cart ID
    const cart = await cartsRepo.getOne(req.session.cartId);

    // Populate each cart item with detailed product information
    for (let item of cart.items) {
        const product = await productsRepo.getOne(item.id);
        item.product = product;
    }

    // Render the cart page with items
    res.send(cartShowTemplate({ items: cart.items }));
});

// Route to handle the deletion of a product from the cart
router.post('/cart/products/delete', async (req, res) => {
    const { itemId } = req.body;
    const cart = await cartsRepo.getOne(req.session.cartId);

    // Filter out the item to be deleted
    const items = cart.items.filter(item => item.id !== itemId);

    // Update the cart with the new items array
    await cartsRepo.update(req.session.cartId, { items });

    // Redirect to the cart page after deletion
    res.redirect('/cart');
});

export default router;
