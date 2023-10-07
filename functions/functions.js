import {router as cartFunctions} from "./cart-functions/cart-functions.js";

const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/.netlify/functions/functions', router); 


// https://ygo-pricechecker.netlify.app/.netlify/functions/functions/dude
router.get('/dude', (req, res) => {
    console.log("works")
    return res.send("This is workjing")
})


app.use("/cart", cartFunctions);

export const handler = serverless(app);