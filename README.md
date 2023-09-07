# Proyecto para el curso Backend Coderhouse
este es mi proyecto para el curso backend por el momento esta es el primer avance en esta aplicacion

# Node.js & Express Server
#This is a basic server built with Node.js and Express to manage products and shopping carts.

# Prerequisites
Before you begin, ensure you have installed:

Node.js
npm (usually comes with Node.js)
# Installation
Clone this repository or download it to your local machine.


git clone [repository-url]
Navigate to the repository's directory.


cd [directory-name]
Install required packages.

# npm install
Running the Server
To start the server, run:


node server.js
The server will start and listen on port 8080. You'll see a message in the console indicating that the server is running.

Endpoints
Products
GET /api/products: Lists all products.

Optional Query: ?limit=NUMBER to limit the number of products returned.
GET /api/products/:pid: Fetches a specific product by its ID.

POST /api/products: Adds a new product.

Required Body:
title: String
description: String
code: String
price: Number
stock: Number
category: String
Optional Body:
thumbnails: Array of strings
Defaults:
status: true
PUT /api/products/:pid: Updates a product by its ID. (ID cannot be updated or removed)

DELETE /api/products/:pid: Deletes a product by its ID.

Shopping Carts
POST /api/carts: Creates a new shopping cart.

GET /api/carts/:cid: Lists products in a specific cart by its cart ID.

POST /api/carts/:cid/product/:pid: Adds a product to a cart. If the product already exists in the cart, it increases the product's quantity.

Product is added with its ID only.
Products are added one at a time.
Testing
To test the server's endpoints, you can use tools like Postman or cURL.

Feel free to modify, expand or style this README to better suit your project's needs.
