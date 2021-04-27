const mongoose = require("mongoose");
const { Schema } = mongoose;

// // const CartSchema = new Schema({
//   _id: { type: Schema.Types.ObjectId, ref: "Product" },
//   quantity: Number
// //   quantity: Number
// })

const CartSchema = new Schema({ 
userId : String, 
products : [{type : Schema.Types.ObjectId, ref : "Product"}]
})

const Cart = mongoose.model("Cart", CartSchema)

module.exports = { Cart };