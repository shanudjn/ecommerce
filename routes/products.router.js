const express = require('express');
const router = express.Router();
const { extend } = require("lodash");

const { Product } = require("../models/product.model");

router.route("/")
.get(async (req, res) => {
   try {
    const products = await Product.find({});
    res.json({ success: true, products })
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to get products", errorMessage: err.message })
  }
})


router.param("id", async(req, res, next, id) => {
  try{
    const product = await Product.findById(id);
    if(!product){
      return res.status(200).json({ success : true, message : "Could Not Retrieve Product"})
    }

    req.product = product;
    next()
  }catch(error){
    res.status(400).status({ success : false, message : "Could not retireve product"})
  }
})
router.route("/:id")
.get(async (req, res)=>{
    const { product } = req;
    console.log({ product });
    res.status(200).json({success : true, product})
})


module.exports = router;