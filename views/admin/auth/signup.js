// Import the shared layout and helper functions for error handling.
import layout from '../layout.js';
import { getError } from '../../helpers.js';

// Export the default function that takes 'req' (the request object) and 'errors' (validation errors) as properties.
export default ({ req, errors }) => {
    // Return a call to the layout function, passing in the HTML content for the signup page.
    return layout({
        content: `
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-one-quarter">
                        <form method="POST">
                            <h1 class="title">Sign Up</h1>
                            <div class="field">
                                <label class="label">Email</label>
                                <!-- Input for email, with inline error display using the getError function -->
                                <input required class="input" placeholder="Email" name="email" />
                                <p class="help is-danger">${getError(errors, 'email')}</p>
                            </div>
                            <div class="field">
                                <label class="label">Password</label>
                                <!-- Input for password, with inline error display -->
                                <input required class="input" placeholder="Password" name="password" type="password" />
                                <p class="help is-danger">${getError(errors, 'password')}</p>
                            </div>
                            <div class="field">
                                <label class="label">Password Confirmation</label>
                                <!-- Input for password confirmation, with inline error display -->
                                <input required class="input" placeholder="Password Confirmation" name="passwordConfirmation" type="password" />
                                <p class="help is-danger">${getError(errors, 'passwordConfirmation')}</p>
                            </div>
                            <!-- Submit button for the form -->
                            <button class="button is-primary">Submit</button>
                        </form>
                        <!-- Link to switch to the sign-in form if the user already has an account -->
                        <a href="/signin">Have an account? Sign In</a>
                    </div>
                </div>
            </div>
        `
    });
};