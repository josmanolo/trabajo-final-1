const express = require('express');
const { getCart, postCarts, deleteCart, saveCart } = require('../controllers/cart.controllers')

const { Router } = express;

const cartProducts = Router();

cartProducts.get('/:id/products', getCart);

cartProducts.post('/', postCarts);

cartProducts.delete('/:id', deleteCart);

cartProducts.put('/:id', saveCart)

module.exports = cartProducts;