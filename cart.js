const fs = require('fs');

class Cart {
    constructor(route) {
        this.route = route;
    }

    async getAll() {
        try {
            const getProducts = await fs.promises.readFile(this.route, 'utf8');
            const productsParse = JSON.parse(getProducts);

            return productsParse;
        } catch (error) {
            return error;
        }
    }

    async save(product) {
        try {
            const getProducts = await fs.promises.readFile(this.route, 'utf8');
            const productsParse = JSON.parse(getProducts);
            const productsLength = productsParse.length;

            productsLength 
                ? await fs.promises.writeFile(this.route, JSON.stringify([...productsParse, {...product, id: productsParse[productsLength - 1].id + 1 }], null, 2))
                : await fs.promises.writeFile(this.route, JSON.stringify([{...product, id: 1}], null, 2));

            return productsLength + 1;
            
        } catch (error) {
            return error;
        }
    }

    async saveProductOnCart(product, id) {
        try {
            const getCarts = await fs.promises.readFile(this.route, 'utf8');
            const cartsParse = JSON.parse(getCarts);

            const newCarts = cartsParse.map(cart => {
                if (cart.id == id.id ) {
                    cart.products.push(product);
                }

                return cart;
            });

            await fs.promises.writeFile(this.route, JSON.stringify(newCarts, null, 2));

            return newCarts;
            
        } catch (error) {
            return error;
        }
    }

    async deleteById(id) {
        try {
            const getProducts = await fs.promises.readFile(this.route, 'utf8');
            const productsParse = JSON.parse(getProducts);
            const findProduct = productsParse.find(prod => prod.id == id);

            if(findProduct) {
                const newProducts = productsParse.filter(product => product.id != id);
                await fs.promises.writeFile(this.route, JSON.stringify(newProducts, null, 2));
            } else {
                return "No se encontró el producto"
            }
            
        } catch (error) {
            return error;
        }
        
    }


    async deleteProductFromCart(idCart, idProduct) {
        try {
            const getCarts = await fs.promises.readFile(this.route, 'utf8');
            const cartsParse = JSON.parse(getCarts);
            const findCart = cartsParse.find(cart => cart.id == idCart);

            if(findCart) {
                const newCarts = cartsParse.map(cart => {
                    if(cart.id == idCart) {
                        const products = cart.products.filter(product => product.id != idProduct);
                        return {...cart, products};
                    }
                    return cart;
                });

                await fs.promises.writeFile(this.route, JSON.stringify(newCarts, null, 2));
            } else {
                return "No se encontró el carrito"
            }
            
        } catch (error) {
            return error;
        }
        
    }
    
    async getById(id) {
        try {
            const getProducts = await fs.promises.readFile(this.route, 'utf8');
            const productsParse = JSON.parse(getProducts);
            const findProduct = productsParse.find(prod => prod.id == id);
            console.log(id)
            return findProduct ? findProduct : null;
        } catch (error) {
            return error;
        }
    }

}

module.exports = Cart;

