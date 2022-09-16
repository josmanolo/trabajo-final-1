const express = require('express');
const { getProducts, postProducts, deleteProducts, putProducts } = require('../controllers/products.controllers.js')

const { Router } = express;

const routerProducts = Router();

routerProducts.get('/:id?', getProducts);

routerProducts.post('/', postProducts);

routerProducts.delete('/:id', deleteProducts);

routerProducts.put('/:id', putProducts);

module.exports = routerProducts;