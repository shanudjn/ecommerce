const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  name : {type : String } ,
  password : {type : String},
  wishlist : [{type: mongoose.Schema.Types.ObjectId,ref: "Product"}],
  cart : [    
      {type: mongoose.Schema.Types.ObjectId,ref: "Product"}        
    ]
})

const User = mongoose.model("User", UserSchema);

module.exports = { User }