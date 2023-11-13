const express = require('express');
const router = express.Router();
const db = require('../helper/db');


router.use(db.mysqlConnection);


router.get('/dude', (req, res) => {
    console.log("works")
    return res.send("inner route is working")
})


// "/.netlify/functions/cart-functions/"

 router.get('/list', async (req, res) => {
     //this is the data that comes from react when clicking on the + button
     try{
     const cartList = await req.db.query(`SELECT * FROM yugioh_cart_list`);
     
     return res.json(cartList);
 
     }catch(error){
     
     return res.status(500).send({ error: 'Failed to find yoru cart' });
     }
 }); 
 
 
 // when you click a button, then it will send a post request to the sql server
 //this function adds quantity if the card exists
 router.put('/add', async (req, res) => {
     
     const userIdFromClientSide = req.body.userId;
     console.log("USERID:", userIdFromClientSide)
 
     try {
     // Check if card already exists in cart list
     const existingCard = await req.db.query(
         `SELECT quantity FROM yugioh_cart_list 
         WHERE card_name = :card_name AND cartId = :cartId AND userId = :userId`,
         {
            card_name: req.body.card_name,
            cartId: req.body.cartId,
            userId: userIdFromClientSide
         }
     );
     console.log("TRYING TO ADD CARD TO CART", req.body.card_name, req.body.userId);
 
     if (existingCard[0][0] != undefined) {
         // If card already exists, update its quantity
         console.log("updated quantity", req.body.card_name, req.body.cartId);
         const updatedCartList = await req.db.query(
         `UPDATE yugioh_cart_list 
         SET quantity = quantity + 1, 
         cardmarket_price = :cardmarket_price * quantity  
         WHERE 
         card_name = :card_name AND 
         cartId = :cartId AND 
         userId = :userId`,
         {
             card_name: req.body.card_name,
             cartId: req.body.cartId,
             cardmarket_price: req.body.cardmarket_price,
             userId: userIdFromClientSide
         }
         );
 
         return res.json(updatedCartList);
     } else {
         console.log("added card to list", req.body.card_name)
         // If card doesn't exist, add it to cart list
         const addCartList = await req.db.query(
         `INSERT INTO yugioh_cart_list (
             card_name, 
             cardmarket_price,
             quantity,
             cartId,
             userId
         ) VALUES (
             :card_name,
             :cardmarket_price,
             :quantity,
             :cartId,
             :userId
         )`,
         {
             card_name: req.body.card_name,
             cardmarket_price: req.body.cardmarket_price,
             quantity: req.body.quantity,
             cartId: req.body.cartId,
             userId: userIdFromClientSide
         }
         );
 
         return res.json(addCartList);
     }
     } catch (err) {
     console.log('post err card not added', err);
     res.status(500).send({ error: 'Failed to add card to cart', message: err });
     }
 });
 
 
 
 //function to subtract 1 and delete when quantity is 0 
 router.put('/updateSubtractItem', async(req, res) => {
     //if quantity is 0 then delete
     const userIdFromClientSide = req.body.userId;
     const selectedCard = await req.db.query(
     `SELECT id, quantity FROM yugioh_cart_list WHERE cartId = :cartId AND userId = :userId`,
     { 
         cartId: req.body.cartId,
         userId: userIdFromClientSide 
     });
     
     try{
     if(selectedCard[0].length === 0){
         console.log("none here")
         return next();
     }
     if (selectedCard[0][0].quantity === 1) {
     
         await req.db.query(
         `DELETE FROM yugioh_cart_list 
         WHERE id = :id AND userId = :userId`,
         {
             id: selectedCard[0][0].id,
             userId: userIdFromClientSide 
         });
     };
 
     if(selectedCard[0] != undefined){
         console.log("subtracting 1 quantity",selectedCard[0][0].quantity)  
         await req.db.query(
             `UPDATE yugioh_cart_list
             SET quantity = quantity - 1 
             WHERE id = :id AND userId = :userId`, 
             {
                id: selectedCard[0][0].id,
                userId: userIdFromClientSide 
             });
     };
     res.status(200).json({ message: 'Item updated successfully.' });
 }catch (error) { 
     console.error('put err did not subtract item', error)
 } 
     
 })
 
 router.delete('/deleteItem', async (req, res) => {
     const userIdFromClientSide = req.body.userId;
     const cardName = req.body.card_name;
     //delete selected row
     //obtain id using name
     //get index of name and then get id from that 
     const existingCard = await req.db.query( 
         `SELECT id FROM yugioh_cart_list
         WHERE card_name = :cardName AND cartId = :cartId AND userId = :userId`,
         {
            cardName: cardName,
            cartId: req.body.cartId,
            userId: userIdFromClientSide 
         }
     );
 
     if (existingCard[0].length === 0) {
         return res.status(404).json({ message: 'Item not found' });
     }
 
     console.log("deleting this one",existingCard[0])
     try {
     
         const deleteCartListItem = await req.db.query(
             `DELETE FROM yugioh_cart_list 
             WHERE id = :id AND userId = :userId`,
             {
                id: existingCard[0][0].id,
                userId: userIdFromClientSide 
             } 
         );
         
         res.json({ message: 'Item deleted successfully', deletedItem: cardName })
         } catch (err) {  
            console.log('did not delete', err)
            res.status(500).json({ message: 'Internal Server Error' }); 
         } 
 })

export {router}