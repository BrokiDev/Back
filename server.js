const express = require('express');
const productRoutes = require('./products');
const cartRoutes = require('./carts');

const app = express();

app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080');
});
