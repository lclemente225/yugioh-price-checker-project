import {router as cartFunctions} from "./cart-functions/cart-functions";
import {router as loginFunctions} from "./login-functions/login-functions";
import {router as profileFunctions} from "./profile-functions/profile-functions"

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


app.use("/.netlify/functions/functions/user", loginFunctions);
app.use("/.netlify/functions/functions/cart", cartFunctions);
app.use("/.netlify/functions/functions/profile", profileFunctions);

export const handler = serverless(app);