const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Products', ProductsSchema)
