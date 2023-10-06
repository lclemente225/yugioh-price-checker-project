const serverless from 'serverless-http';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// https://ygo-pricechecker.netlify.app/.netlify/functions/functions/dude
router.get('/dude', (req, res) => {
    console.log("works")
    return res.send("This is workjing")
})

const cartFunctions = require("/.netlify/functions/cart-functions/cart-functions");

app.use("/cart", cartFunctions);
app.use('/.netlify/functions/functions', router); 

module.exports.handler = serverless(app);