const Cart = require("../containers/cart/cartFile");

const isAdmin = true;
const cart = new Cart();

const getCart = async (req, res) => {
    const { id } = req.params;

    const resProducts = async () => {
        try {
            const prod = !id
                ? await cart.getAll()
                : await cart.getById(id);
            console.log(prod);
            res.json(prod);
        } catch (error) {
            res.json(error);
        }
    };

    resProducts();
};

const postCarts = async (req, res) => {
    const { body } = req;

    const saveCart = async () => {
        try {
            await cart.save(body);
            res.json({
                msg: "El carrito fue guardado con exito",
            });
        } catch (error) {
            res.json(error);
        }
    };

    saveCart();
};

const saveCart = async (req, res) => {
    const { body, params: id } = req;

    const addProdToCart = async () => {
        try {
            await cart.saveProductOnCart(body, id);
            res.json({
                msg: "El producto fue guardado en el carrito con exito",
            });
        } catch (error) {
            res.json(error);
        }
    };

    addProdToCart();
};

const deleteCart = async (req, res) => {
    const { id } = req.params;
    const deleteCart = async () => {
        try {
            await cart.deleteById(id);
            res.json({
                msg: "El carrito fue borrado con exito",
            });
        } catch (error) {
            res.json(error);
        }
    };

    deleteCart();
};


module.exports = { getCart, postCarts, saveCart, deleteCart  };
