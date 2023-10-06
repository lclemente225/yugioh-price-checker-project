const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const allowedOrigins = [
        'https://main--ygo-pricechecker.netlify.app', 
        'http://localhost:5173', 
        'https://ygo-pricechecker.netlify.app'
  ];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: function (origin, callback) {
                if (allowedOrigins.includes(origin) || !origin) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
};

// Use the CORS middleware with the specified options
app.use(cors(corsOptions));

// https://ygo-pricechecker.netlify.app/.netlify/functions/functions/dude
app.get('/dude', (req, res) => {
    console.log("works")
    return res.send("This is workjing")
})

/* const cartFunctions = require("./cart-functions/cart-functions");

app.use("/cart", cartFunctions);
app.use('/.functions/functions/', router); */

export const handler = serverless(app);