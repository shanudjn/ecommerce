const express = require('express');
const router = express.Router();
const { extend } = require("lodash")

const { User } = require('../models/user.model');
const { route } = require('./products.router');


//keep this for sign up
router.route('/')
  .get(async (req, res) => {
    try {
      const users = await User.find({}).populate("cart wishlist");
      res.json({ success: true, users })
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to get products", errorMessage: err.message })
    }
  })
  .post(async (req, res) => {
    try {
      const { name, password } = req.body;
      const registeredUser = await User.findOne({ name: name, password: password })
      console.log(registeredUser)
      res.json({ success: true, registeredUserId: registeredUser._id })
    } catch (error) {
      res.status(500).json({ success: false, message: error.message })
    }
  })
router.route('/signup')
  .post(async (req, res) => {
    console.log("signing up")
    const { username, password } = req.body.user;
    try {
      const newUser = await new User({ name: username, password: password, wishlist: [], cart: [] });
      // const salt = await bcrypt.genSalt(10);

      // newUser.password = await bcrypt.hash(newUser.password, salt);


      await newUser.save();

      res.status(201).json({ success: true, newUser })
    } catch (error) {
      res.status(501).json({ success: false, message: "Sign Up Failed", error: error.message })
    }

  })
router.route("/:userId")
  .get(async (req, res) => {
    try {
      const { userId } = req.params
      const user = await User.findById(userId).populate("cart wishlist")
      console.log(user)
      res.status(200).json({ success: true, user })
    } catch (error) {
      res.json({ message: "Could not find user" })
    }
  })

//add to cart
router.route("/:userId/product/:productId")
  .post(async (req, res) => {
    try {
      const { userId, productId } = req.params
      console.log(userId, productId)

      const updatedCart = await User.findByIdAndUpdate(userId, { $push: { cart: productId } }).populate("cart wishlist")
      // updatedCart = extend (updatedCart, {quantity : 1})
      console.log(updatedCart)
      // updatedCart.save();

      console.log(updatedCart)
      res.json({ updatedCart })
    } catch (error) {
      res.json({ message: "Could Not Add to Cart" })
    }
  })
  .delete(async (req, res) => {
    try {
      const { userId, productId } = req.params
      console.log(userId, productId);
      const updatedCart = await User.findByIdAndUpdate(userId, { $pull: { cart: productId } })

      updatedCart.save();
      const user = await User.findById(userId).populate("cart wishlist");
      console.log(user)
      res.status(202).json({ user })

    } catch (error) {
      res.json({ message: "Error removing product" })
    }
  })

//add to wishlist
router.route("/:userId/wishlist/:productId")
  .post(async (req, res) => {
    try {
      const { userId, productId } = req.params
      console.log(userId, productId)

      const updatedWishlist = await User.findByIdAndUpdate(userId, { $push: { wishlist: productId } })

      updatedWishlist.save();

      console.log(updatedWishlist)
      res.json({ updatedWishlist })
    } catch (error) {
      res.json({ message: "Could Not Add to Wishlist" })
    }
  })
  .delete(async (req, res) => {
    try {
      const { userId, productId } = req.params
      console.log(userId, productId);
      const updatedCart = await User.findByIdAndUpdate(userId, { $pull: { wishlist: productId } })

      updatedCart.save();
      const user = await User.findById(userId).populate("cart wishlist");
      console.log(user)
      res.status(202).json({ user })

    } catch (error) {
      res.json({ message: "Error removing product" })
    }
  })


module.exports = router;