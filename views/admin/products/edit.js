// Import the shared layout and the error handling helper function.
import layout from '../layout.js';
import { getError } from '../../helpers.js';

// Define and export the default function that takes the `product` data and `errors` for form validation.
export default ({ product, errors }) => {
    // Use the layout template to structure the page content, passing in the actual content dynamically.
    return layout({
        content: `
            <div class="columns is-centered">
                <div class="column is-half">
                    <h1 class="subtitle">Edit a Product</h1>
                    <form method="POST" enctype="multipart/form-data">
                        <div class="field">
                            <label class="label">Title</label>
                            <!-- Input for the product title, pre-filled with existing title, shows validation error if any -->
                            <input value="${product.title}" class="input" placeholder="Title" name="title" />
                            <p class="help is-danger">${getError(errors, 'title')}</p>
                        </div>

                        <div class="field">
                            <label class="label">Price</label>
                            <!-- Input for the product price, pre-filled with existing price, shows validation error if any -->
                            <input value="${product.price}" class="input" placeholder="Price" name="price" />
                            <p class="help is-danger">${getError(errors, 'price')}</p>
                        </div>

                        <div class="field">
                            <label class="label">Image</label>
                            <!-- Input field for updating the image, uses multipart/form-data for file upload -->
                            <input type="file" name="image" />
                        </div>
                        <br />
                        <!-- Submit button to save changes -->
                        <button class="button is-primary">Edit</button>
                    </form>
                </div>
            </div>
        `,
    });
};