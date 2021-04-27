const express = require('express');
const router = express.Router();
const {extend} = require("lodash")

const { TestUser } = require('../models/user.model');


router.route("/:userId/product/:productId")
.post(async (req, res) => {
 try{
  const {userId, productId} = req.params
  console.log(userId, productId)
  
  const updatedCart =await User.findByIdAndUpdate(userId, { $push: { cart: productId}}).populate("cart wishlist")
  // updatedCart = extend (updatedCart, {quantity : 1})
  console.log(updatedCart)
  // updatedCart.save();

  console.log(updatedCart)
  res.json({updatedCart})
 }catch(error){
   res.json({message : "Could Not Add to Cart"})
 }
})

module.exports = router;