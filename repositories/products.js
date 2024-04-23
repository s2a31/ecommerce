// Importing the base Repository class for common data operations
import Repository from './repository.js';

// Extending the Repository for products-specific data manipulation
class ProductsRepository extends Repository {}

// Exporting an instance of ProductsRepository for the 'products.json' file
export default new ProductsRepository('products.json');
