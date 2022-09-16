const express = require('express');
const Cart = require('./containers/cart/cartFile');
const { Router } = express;

const routerProducts = require('./routes/products.routes.js');
require('dotenv').config();

const app = express();

const routerCart = Router();

app.use(express.json());
app.use('/api/products', routerProducts);
app.use('/api/cart', routerCart);

app.listen('8080', () => {
    console.log('Server running on port 8080');
})