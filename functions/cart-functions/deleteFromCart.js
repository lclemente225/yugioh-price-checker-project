exports.handler = async function(event, context) {
    
    app.delete('/cart/deleteItem', async (req, res) => {
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
            
            return res.json({ 
                        message: 'Item deleted successfully', 
                        deletedItem: cardName 
                        });

            } catch (err) {  
                console.log('did not delete', err)
                res.status(500).json({ message: 'Internal Server Error' }); 
            } 
    })
}