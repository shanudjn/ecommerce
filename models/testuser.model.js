const mongoose = require("mongoose");
const { Schema } = mongoose;

const TestUserSchema = new mongoose.Schema({
  name : {type : String } ,
  password : {type : String},
  wishlist : [{type: mongoose.Schema.Types.ObjectId,ref: "Product"}],
  cart : [    
      {type: mongoose.Schema.Types.ObjectId,ref: "Product"}        
    ]
})

const TestUser = mongoose.model("TestUser", UserSchema);

module.exports = { TestUser }