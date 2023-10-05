exports.handler = async function(event, context) {
        
        //function to subtract 1 and delete when quantity is 0 
        app.put('/cart/updateSubtractItem', async(req, res) => {
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
                    }
                );
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
                    }
                );
            };
            res.status(200).json({ message: 'Item updated successfully.' });
        }catch (error) { 
            console.error('put err did not subtract item', error)
        } 
            
        })
}