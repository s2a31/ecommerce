// Importing the layout and helper functions.
import layout from '../layout.js';
import { getError } from '../../helpers.js';

// Exporting a default function that takes an object containing 'errors'.
export default ({ errors }) => {
    // Return the layout function call, which will use the provided HTML content.
    return layout({
        content: `
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-one-quarter">
                        <form method="POST">
                            <h1 class="title">Sign in</h1>
                            <div class="field">
                                <label class="label">Email</label>
                                <!-- Email input field, displays validation error using getError helper function -->
                                <input required class="input" placeholder="Email" name="email" />
                                <p class="help is-danger">${getError(errors, 'email')}</p>
                            </div>
                            <div class="field">
                                <label class="label">Password</label>
                                <!-- Password input field, also displays validation error -->
                                <input required class="input" placeholder="Password" name="password" type="password" />
                                <p class="help is-danger">${getError(errors, 'password')}</p>
                            </div>
                            <!-- Submit button for the form -->
                            <button class="button is-primary">Submit</button>
                        </form>
                        <!-- Link to switch to the signup form -->
                        <a href="/signup">Need an account? Sign Up</a>
                    </div>
                </div>
            </div>
        `
    });
};
