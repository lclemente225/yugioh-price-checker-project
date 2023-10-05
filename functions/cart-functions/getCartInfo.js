exports.handler = async function(event, context) {
    app.get('/cart/list', async (req, res) => {
        //this is the data that comes from react when clicking on the + button
        try{
        const cartList = await req.db.query(`SELECT * FROM yugioh_cart_list`);
        
        return res.json(cartList);
    
        }catch(error){
        
        res.status(500).json({ error: 'Failed to find yoru cart' });
        }
    }); 
}