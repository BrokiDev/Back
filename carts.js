const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const cartsFile = './carrito.json';

const readCarts = () => {
    try {
        return JSON.parse(fs.readFileSync(cartsFile, 'utf8'));
    } catch (error) {
        return [];
    }
};

router.post('/', (req, res) => {
    const newCart = {
        id: uuidv4(),
        products: []
    };

    const carts = readCarts();
    carts.push(newCart);
    fs.writeFileSync(cartsFile, JSON.stringify(carts));

    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const cart = readCarts().find(c => c.id === req.params.cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');
    res.json(cart.products);
});

router.post('/:cid/product/:pid', (req, res) => {
    const carts = readCarts();
    const cart = carts.find(c => c.id === req.params.cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');

    const productIndex = cart.products.findIndex(p => p.product === req.params.pid);

    if (productIndex === -1) {
        cart.products.push({ product: req.params.pid, quantity: 1 });
    } else {
        cart.products[productIndex].quantity += 1;
    }

    fs.writeFileSync(cartsFile, JSON.stringify(carts));
    res.json(cart);
});

module.exports = router;
