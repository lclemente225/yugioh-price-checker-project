import {router as cartFunctions} from "./cart-functions/cart-functions.js";

const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// https://ygo-pricechecker.netlify.app/.netlify/functions/functions/dude
app.get('/dude', (req, res) => {
    console.log("works")
    return res.send("This is workjing")
})


app.use("/cart", cartFunctions);
app.use('/.netlify/functions/functions', router); 

export const handler = serverless(app);