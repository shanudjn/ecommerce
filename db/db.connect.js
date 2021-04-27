const mongoose = require('mongoose');
const username = process.env['username'];
const password = encodeURIComponent(process.env['password']);

async function initializeDBConnection(){
  const uri = 'mongodb+srv://'+username+':'+password+'@neog-cluster.7up1q.mongodb.net/ecommerce?retryWrites=true&w=majority'
  try{
    const connectionResponse = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

    console.log("Connected to db successfully...");


  }catch(error){
    console.log(error);
    console.log("Error connecting to db")
  }
}

module.exports = { initializeDBConnection }