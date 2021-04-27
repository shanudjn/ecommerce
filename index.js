const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { initializeDBConnection } = require('./db/db.connect.js');

const { routeNotFound } = require('./middleware/routeNotFound');
const { errorHandler } = require('./middleware/errorHandler');

const populateProductsCollection = require('./utils/utils');


const app = express();
app.use(cors())
app.use(bodyParser.json())

const products = require('./routes/products.router.js'); 
const login = require('./routes/login.router.js');
const user = require('./routes/user.router.js')
// const testuser = require('./routes/testuser.router.js')
const cart = require('./routes/cart.router.js')


initializeDBConnection();

/**
 * RUN ONLY ONCE TO POPULATE TABLE
 */
//populateProductsCollection();

app.get('/', (req, res) => {
  res.status(200).json({success : true ,message:'Hello Express app!'})
 
});

app.use("/products", products);
app.use("/user", user)
app.use("/cart", cart);
// app.use("/testuser",testuser);
app.use("/login", login);


app.use(routeNotFound)

app.use(errorHandler)
 
// app.listen(3000, () => {
//   console.log('server started');
// });
app.listen(process.env.PORT, () => {
  console.log('server started');
});