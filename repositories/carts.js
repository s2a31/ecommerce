// Importing the base Repository class for common data operations
import Repository from './repository.js';

// Extending the Repository for carts-specific data manipulation
class CartsRepository extends Repository {}

// Exporting an instance of CartsRepository for the 'carts.json' file
export default new CartsRepository('carts.json');
