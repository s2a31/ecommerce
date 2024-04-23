// Define a helpers object to encapsulate utility functions used across various views.
const helpers = {
    // Define a method to retrieve and format error messages for form fields.
    getError(errors, prop) {
        try {
            // Attempt to extract and return the error message for a specific property.
            // The `errors` object is expected to have a method `mapped` that converts the array of errors into an object keyed by field names.
            return errors.mapped()[prop].msg;
        } catch (err) {
            // If the property does not exist or another error occurs, return an empty string to avoid displaying undefined errors.
            return '';
        }
    },
}

// Export the helpers object to make it available for use in other modules.
export default helpers;
// Additionally, export the getError function directly for ease of access and use in other parts of the application.
export const getError = helpers.getError;
