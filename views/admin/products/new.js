// Import layout from the layout module for a consistent interface and getError helper for displaying form errors
import layout from '../layout.js';
import { getError } from '../../helpers.js';

// Export default function that dynamically generates the HTML content for the new product form
export default ({ errors }) => {
    // Return the layout structure containing the new product form
    return layout({
        content: `
            <div class="columns is-centered">
                <div class="column is-half">
                    <h1 class="subtitle">Create a Product</h1>

                    <form method="POST" enctype="multipart/form-data">
                        <div class="field">
                            <label class="label">Title</label>
                            <input class="input" placeholder="Title" name="title" />
                            <p class="help is-danger">${getError(errors, 'title')}</p>
                        </div>

                        <div class="field">
                            <label class="label">Price</label>
                            <input class="input" placeholder="Price" name="price" />
                            <p class="help is-danger">${getError(errors, 'price')}</p>
                        </div>

                        <div class="field">
                            <label class="label">Image</label>
                            <input type="file" name="image" />
                        </div>
                        <br />
                        <button class="button is-primary">Create</button>
                    </form>
                </div>
            </div>
        `,
    });
};
