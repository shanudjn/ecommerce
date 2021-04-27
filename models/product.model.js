const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProductSchema = new mongoose.Schema({    
    name: String,
    image: String,
    price: Number,
    inStock: Boolean,
    fastDelivery: Boolean,
    rating: Number,
    discount: Number,
    category: String,    
})

const Product = mongoose.model('Product', ProductSchema);



module.exports = { Product }