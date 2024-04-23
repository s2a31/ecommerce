# E-Commerce Application

This is a Node.js e-commerce application that demonstrates basic shopping cart and product management functionalities along with user authentication and administration. The backend is built with Express and uses JSON files for storing data. The front end utilizes server-side rendered HTML templates.

## Features

- User Sign-in/Sign-up
- Product Browsing
- Admin Product Management (Create, Read, Update, Delete)
- Shopping Cart Management

## Prerequisites

You need to have Node.js and npm installed on your machine to run this project.

## Installation

1. **Clone the Repository**

   ```
   git clone https://github.com/s2a31/ecommerce.git
   cd ecommerce
   ```

2. **Install Dependencies**

   ```
   npm install
   ```

3. **Start the Application**

   ```
   npm run dev
   ```
   This command will start the application on `localhost:3000`.

## Configuration

This application uses a cookie session for managing user sessions. A unique key for cookie encryption is required and is set in the code. For added security, it is recommended to move this to environment variables in production.

## Usage

Once the server is running, navigate to `http://localhost:3000` to view the application. The `/admin/products` route is used for product management by an admin user.

## Data Store

- Data is stored in JSON files located in the repository, making the application simple and without the need for an external database.
- **Note**: The current file-based storage system is not suitable for production environments.

## Important Notes

- The application is not designed for a production environment and lacks features such as real-time data persistence and concurrent request handling.
- There is no mechanism to prevent race conditions and file access conflicts, making the JSON file storage method vulnerable when handling multiple simultaneous requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Contact

For support or queries, reach out to [baloghszabolcs43@gmail.com](mailto:baloghszabolcs43@gmail.com).
