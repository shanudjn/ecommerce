const mongoose = require('mongoose');
// const username = process.env['DB_USERNAME'];
// const password = encodeURIComponent(process.env['DB_PASSWORD'])
const username = "shahazad"
const password = "Sh@nu!995"
async function initializeDBConnection() {
  // console.log(username, password)
  // const uri = `mongodb+srv://${username}:${password}@neog-cluster.7up1q.mongodb.net/ecommerce?retryWrites=true&w=majority`
  const uri = `mongodb+srv://${username}:${password}@neog-cluster.7up1q.mongodb.net/ecommerce?retryWrites=true&w=majority`;

  try {
    const connectionResponse = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

    console.log("Connected to db successfully...");


  } catch (error) {
    console.log(error);
    console.log("Error connecting to db");
  }
}

module.exports = { initializeDBConnection }