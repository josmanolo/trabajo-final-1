const express = require('express');
const Cart = require('./cart');
const { Router } = express;
const Products = require('./products');
require('dotenv').config();

const app = express();
const routerProducts = Router();
const routerCart = Router();
const products = new Products('./products.txt');
const carts = new Cart('./cart.txt');
const isAdmin = true;
const PORT = process.env.PORT;

console.log(PORT)

app.use(express.json());

//Products
routerProducts.get('/:id?', (req, res) => {
    const { id } = req.params;
    
    const getProducts = async () => {
        try {
            const prod = !id ? await products.getAll() : await products.getById(id);
            console.log(prod)
            res.json(prod);
    
        } catch (error) {
            res.json(error);
        }
    }

    getProducts();
});

routerProducts.post('/', (req,res) => {
    const { body } = req;

    if(isAdmin) {
        const saveProduct = async () => {
            try {
                await products.save(body);
                res.json({
                    msg: "El producto fue guardado con exito"
                });
            } catch (error) {
                res.json(error)
            }
        }
        saveProduct();
    } else {
        res.json({
            error: -1,
            description: "Ruta / Metodo POST no autorizada"
    
        });
    }
});

routerProducts.delete('/:id', (req, res) => {
    const { id } = req.params;
    if(isAdmin) {
        const deleteProducts = async () => {
            try {
                const deletes = await products.deleteById(id);
                res.json({
                    msg: "El producto fue borrado con exito",
                })
            } catch (error) {
                res.json(error);
            }
        }
        deleteProducts();
    } else {
        res.json({
            error: -1,
            description: "Ruta / Metodo POST no autorizada"
    
        });
    }
});

routerProducts.put('/:id', (req, res) => {
    const { body, params: id } = req;

    const updateProduct = async () => {
        try {
            const re = await products.updateById(id, body);
            console.log(re)
            res.json(
                {msg: "El producto fue actualizado con exito"}
            ); 

        } catch (error) {
            res.json(error)
        }
    }

    updateProduct();
})

app.use('/api/products', routerProducts);

//Cart

routerCart.get('/:id/products', (req, res) => {
    const { id } = req.params;
    
    const getCart = async () => {
        try {
            const cart = await carts.getById(id);
            console.log(cart)
            res.json(cart.products);
    
        } catch (error) {
            res.json(error);
        }
    }

    getCart();
});

routerCart.post('/', (req,res) => {
    const { body } = req;

    const saveCart = async () => {
        try {
            await carts.save(body);
            res.json({
                msg: "El carrito fue guardado con exito"
            });
        } catch (error) {
            res.json(error)
        }
    }

    saveCart();
});

routerCart.post('/:id/products', (req, res) => {
    const { body, params: id } = req;

    const addProdToCart = async () => {
        try {
            await carts.saveProductOnCart(body, id);
            res.json({
                msg: "El producto fue guardado en el carrito con exito"
            });
        } catch (error) {
            res.json(error)
        }
    }

    addProdToCart();
})

routerCart.delete('/:id', (req, res) => {
    const { id } = req.params;
    const deleteCart = async () => {
        try {
            await carts.deleteById(id);
            res.json({
                msg: "El carrito fue borrado con exito",
            })
        } catch (error) {
            res.json(error);
        }
    }

    deleteCart();
})

routerCart.delete('/:id/products/:id_prods', (req, res) => {
    const { id, id_prods } = req.params;

    const deleteProduct = async () => {
        try {
            const re = await carts.deleteProductFromCart(id, id_prods);
            res.json({
                msg: "El producto fue borrado"
            })
        } catch (error) {
            res.json(error)
        }
    }

    deleteProduct();
})

app.use('/api/cart', routerCart);

app.listen(PORT, () => {
    console.log('Server running on port 8080');
})