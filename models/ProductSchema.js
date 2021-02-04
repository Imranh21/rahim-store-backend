const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    proname: {
        type: String,
        required: true
    },
    proprice: {
        type: Number,
        required: true
    },
    proexpire: {
        type: Date,
        required: true
    }
})

const Product = mongoose.model("products", ProductSchema)
module.exports = Product