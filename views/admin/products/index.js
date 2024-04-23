// Importing the shared layout template for consistent page structure across the admin panel
import layout from '../layout.js';

// Define and export the default function that takes the `products` array as an argument
export default ({ products }) => {
    // Mapping over each product to create HTML table rows with product details
    const renderedProducts = products.map((product) => {
        return `
            <tr>
                <td>${product.title}</td> <!-- Displaying the product title -->
                <td>${product.price}</td> <!-- Displaying the product price -->
                <td>
                    <a href="/admin/products/${product.id}/edit">
                        <button class="button is-link">Edit</button> <!-- Button to navigate to the edit page for each product -->
                    </a>
                </td>
                <td>
                    <form method="POST" action="/admin/products/${product.id}/delete">
                        <button class="button is-danger">Delete</button> <!-- Button to delete the product, submits form to server -->
                    </form>
                </td>
            </tr>
        `;
    }).join(''); // Joining all rows into a single string to insert into the HTML table

    // Returning the complete page using the layout template
    return layout({
        content: `
            <div class="control">
                <h1 class="subtitle">Products</h1>
                <a href="/admin/products/new" class="button is-primary">New Product</a> <!-- Link to add a new product -->
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Title</th> <!-- Column header for product titles -->
                        <th>Price</th> <!-- Column header for product prices -->
                        <th>Edit</th> <!-- Column header for edit actions -->
                        <th>Delete</th> <!-- Column header for delete actions -->
                    </tr>
                </thead>
                <tbody>
                    ${renderedProducts} <!-- Inserting the table rows created from the products array -->
                </tbody>
            </table>
        `,
    });
};
