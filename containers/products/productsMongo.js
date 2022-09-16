const mongoose = require("mongoose");
const Products = require("../../models/products.model");

const connectDB = async () => {
    try {
        const url =
            "mongodb+srv://jomalolep:Arush1429@cluster0.tus6ylk.mongodb.net/test";
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }
};

connectDB();

class ProductsMongo {
    constructor() {}

    async getAll() {
        try {
            const products = await Products.find();
            console.log(products);
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async save(product) {
        try {
            new Products(product).save();
            return ;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            await Products.deleteOne({ id: id });
            res.send("Deleted");
            return;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const products = await Products.find({ id });
            console.log(products);
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id, product) {
        try {
            const { name, price, imgUrl } = product;
            await Products.findOneAndUpdate(
                { id },
                {
                    name,
                    price,
                    imgUrl,
                }
            );
            return;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProductsMongo;
