const express = require('express');
const mongoose = require("mongoose");
const {extend} = require("lodash")
const router = express.Router();

const { Cart } = require("../models/cart.model");

router.route("/")
  .get(async (req, res) => {
    try{
      //const {userId} = req.body;
      const cart = await Cart.find({}).populate("product","name image price");
      console.log(cart)
      res.status(200).json({ success : true, cart})
    }catch(error){
      res.status(400).json({ success : false, message : "Unable to fetch cart"})
    }
})
.post(async (req, res) => {
 try {
    const {userId, productId} = req.body
    //  const {userId} = req.body;
    

     const cartItem = new Cart({userId})
     console.log(cartItem) 

     const newItem = await cartItem.save();
     newItem.products.push(productId)
     console.log(newItem)

     const savedItem = await newItem.save()
     console.log(savedItem)
    //  res.json(savedItem) 
   
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to add products", errorMessage: err.message})
  }
})

// .post(async(req, res) => {
//   try{
//     const {productId} = req.body;
//     console.log(productId)
//     const newCartItem = new Cart(productId);
//     console.log(newCartItem)
//     const actu = await newCartItem.save();
//     console.log(cart)
//   }catch(error){
//     res.json({success : false} )
//   }
// })

router.route("/:userId")
.get(async (req, res) => {
  try{
     // const {productId} = req.params  
     const {userId} = req.params;
      const cart = await Cart.findOne({ userId : userId }).populate("products","name image price");        

      console.log(cart)
      res.status(200).json({ success : true, cart})   
   
  }
  catch(error){
    res.status(400).json({ success : false, message : "Unable to find item in cart", error : error.message})
  }
})

.post( async(req, res) => {
  try{
    const {productId} = req.params
    const {userId} = req.body;
    const cart = await Cart.find({userId : userId})
    console.log(cart)
    
    // cart.products.push(mongoose.Types.ObjectId(productId));
    // cart[0].products.push(mongoose.Types.ObjectId(productId));
    
    // cart[0].save();
    // console.log(cart)
    // res.status(200).json({"success" : true, cart})

    // // const savedItem = await cart.save(); 
    // res.status(200).json({"success" : true, savedItem})   
  }catch(error){
    res.json({success : false, message : error.message})
  }
})

module.exports = router