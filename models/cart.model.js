const mongoose = require("mongoose");

const ProductsInCartSchema = new mongoose.Schema({
    timestamp: { type: Number },
    name: { type: String },
    description: { type: String },
    code: { type: String },
    imgUrl: { type: String },
    price: { type: Number },
    stock: { type: Number },
});

const CartsSchema = new mongoose.Schema({
    timestamp: {
        type: Number,
        required: true,
    },
    products: [ProductsInCartSchema],
});

module.exports = mongoose.model("Cart", CartsSchema);
