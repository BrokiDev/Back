const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const productsFile = './productos.json';

const readProducts = () => {
    try {
        return JSON.parse(fs.readFileSync(productsFile, 'utf8'));
    } catch (error) {
        return [];
    }
};

router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit) || readProducts().length;
    res.json(readProducts().slice(0, limit));
});

router.get('/:pid', (req, res) => {
    const product = readProducts().find(p => p.id === req.params.pid);
    if (!product) return res.status(404).send('Producto no encontrado');
    res.json(product);
});

router.post('/', (req, res) => {
    const { title, description, code, price, status=true, stock, category, thumbnails=[] } = req.body;
    if (!(title && description && code && typeof price === 'number' && typeof stock === 'number' && category)) {
        return res.status(400).send('Campos obligatorios no proporcionados');
    }

    const newProduct = {
        id: uuidv4(),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };

    const products = readProducts();
    products.push(newProduct);
    fs.writeFileSync(productsFile, JSON.stringify(products));

    res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
    const products = readProducts();
    const index = products.findIndex(p => p.id === req.params.pid);
    if (index === -1) return res.status(404).send('Producto no encontrado');

    for (let key in req.body) {
        if (key !== 'id' && req.body[key]) {
            products[index][key] = req.body[key];
        }
    }
    
    fs.writeFileSync(productsFile, JSON.stringify(products));
    res.json(products[index]);
});

router.delete('/:pid', (req, res) => {
    const products = readProducts();
    const index = products.findIndex(p => p.id === req.params.pid);
    if (index === -1) return res.status(404).send('Producto no encontrado');

    products.splice(index, 1);
    fs.writeFileSync(productsFile, JSON.stringify(products));

    res.send('Producto eliminado');
});

module.exports = router;
