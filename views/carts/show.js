// Importing the layout file to maintain a consistent page structure across the application
import layout from '../layout.js';

// Default export of a function that generates the shopping cart page content
export default ({ items }) => {
    // Calculate total price by summing up the products' prices multiplied by their quantities
    const totalPrice = items.reduce((prev, item) => {
        return prev + item.quantity * item.product.price;
    }, 0);

    // Generate HTML for each cart item using map to iterate over each item in the cart
    const renderedItems = items.map((item) => {
        return `
            <div class="cart-item message">
                <h3 class="subtitle">${item.product.title}</h3>
                <div class="cart-right">
                    <div>$${item.product.price} X ${item.quantity} =</div>
                    <div class="price is-size-4">$${item.product.price * item.quantity}</div>
                    <div class="remove">
                        <form method="POST" action="/cart/products/delete">
                            <input hidden value="${item.id}" name="itemId">
                            <button class="button is-danger">
                                <span class="icon is-small">
                                    <i class="fas fa-times"></i>
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }).join(''); // Join the HTML strings into a single string for rendering

    // Return the layout, injecting the dynamic content for the shopping cart
    return layout({
        content: `
            <div id="cart" class="container">
                <div class="columns">
                    <div class="column"></div>
                    <div class="column is-four-fifths">
                        <h3 class="subtitle"><b>Shopping Cart</b></h3>
                        <div>${renderedItems}</div>
                        <div class="total message is-info">
                            <div class="message-header">Total</div>
                            <h1 class="title">$${totalPrice}</h1>
                            <button class="button is-primary">Buy</button>
                        </div>
                    </div>
                    <div class="column"></div>
                </div>
            </div>
        `,
    });
};
