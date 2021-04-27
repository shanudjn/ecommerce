const fakeProducts = require('../models/product.data');


async function populateProductsCollection(){
  try{
    fakeProducts.forEach(async(product) => {
      const newProduct = new Product(product);
      const savedProduct = await newProduct.save();
      console.log(savedProduct)
    })
  }
  catch(error){
    console.log(error)
  }
}

module.exports = populateProductsCollection;