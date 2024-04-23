// Default export of a function that generates the HTML layout for the admin pages.
export default ({ content }) => {
    // Returns a template literal that defines the structure of the HTML document.
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Shop</title>
                <!-- Links to external CSS for styles from FontAwesome and Bulma -->
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
                <link href="/css/main.css" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">
            </head>
            <body class="admin">
                <header>
                    <!-- Navigation bar specifically for the admin panel for product management -->
                    <nav class="navbar navbar-bottom">
                        <div class="container navbar-container">
                            <div>
                                <!-- Link that redirects to the admin products management page -->
                                <a href="/admin/products">
                                    <h3 class="title">Admin Panel</h3>
                                </a>
                            </div>
                            <div class="navbar-item">
                                <div class="navbar-buttons">
                                    <div class="navbar-item">
                                        <!-- Quick access link to view products directly from the admin panel -->
                                        <a href="/admin/products"><i class="fa fa-star"></i> Products</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
                <!-- Main container where dynamic content will be injected -->
                <div class="container">${content}</div>
            </body>
        </html>
    `;
};
