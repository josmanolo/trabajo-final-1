const Products = require('../products.js');

const isAdmin = true;
const products = new Products();

const getProducts = async (req, res) => {
    const { id } = req.params;

    const resProducts = async () => {
        try {
            const prod = !id
                ? await products.getAll()
                : await products.getById(id);
            console.log(prod);
            res.json(prod);
        } catch (error) {
            res.json(error);
        }
    };

    resProducts();
};

const postProducts = async (req, res) => {
    const { body } = req;

    if (isAdmin) {
        const saveProduct = async () => {
            try {
                await products.save(body);
                res.json({
                    msg: "El producto fue guardado con exito",
                });
            } catch (error) {
                res.json(error);
            }
        };
        saveProduct();
    } else {
        res.json({
            error: -1,
            description: "Ruta / Metodo POST no autorizada",
        });
    }
};

const deleteProducts = async (req, res) => {
    const { id } = req.params;
    if (isAdmin) {
        const deleteProducts = async () => {
            try {
                await products.deleteById(id);
                res.json({
                    msg: "El producto fue borrado con exito",
                });
            } catch (error) {
                res.json(error);
            }
        };
        deleteProducts();
    } else {
        res.json({
            error: -1,
            description: "Ruta / Metodo POST no autorizada",
        });
    }
};

const putProducts = async (req, res) => {
    const { body, params: id } = req;

    const updateProduct = async () => {
        try {
            const re = await products.updateById(id, body);
            console.log(re);
            res.json({ msg: "El producto fue actualizado con exito" });
        } catch (error) {
            res.json(error);
        }
    };

    updateProduct();
};

module.exports = { getProducts, postProducts, deleteProducts, putProducts };
