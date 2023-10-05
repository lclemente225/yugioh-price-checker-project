const mysql = require('mysql2/promise');

exports.handler = async function(event, context) {
        
         
        // when you click a button, then it will send a post request to the sql server
        //this function adds quantity if the card exists

        //sql setup
        const pool = mysql.createPool({
            host: process.env.DATABASE_HOST_URL,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PW,
            database: process.env.DATABASE_USER
        });


        app.use(async function mysqlConnection(req, res, next) {
            try {
                req.db = await pool.getConnection();

                req.db.connection.config.namedPlaceholders = true;
            
                // Traditional mode ensures not null is respected for unsupplied fields, ensures valid JavaScript dates, etc.
                await req.db.query('SET SESSION sql_mode = "TRADITIONAL"');
                await req.db.query(`SET time_zone = '-8:00'`);

            
                await next();
                req.db.release();
            } catch (err) {
            // If anything downstream throw an error, we must release the connection allocated for the request
            
            console.log(err)
            if (req.db) req.db.release();

            throw err;
            }
        });

        app.put('/cart/add', async (req, res) => {
            
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
                    SET quantity = quantity + 1, price = :price * quantity  
                    WHERE card_name = :card_name AND cartId = :cartId AND userId = :userId`,
                    {
                        card_name: req.body.card_name,
                        cartId: req.body.cartId,
                        price: req.body.price,
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
                        price,
                        quantity,
                        cartId,
                        userId
                    ) VALUES (
                        :card_name,
                        :price,
                        :quantity,
                        :cartId,
                        :userId
                    )`,
                    {
                        card_name: req.body.card_name,
                        price: req.body.price,
                        quantity: req.body.quantity,
                        cartId: req.body.cartId,
                        userId: userIdFromClientSide
                    }
                );
        
                return res.json(addCartList);

            }
            } catch (err) {
                console.log('post err card not added', err);
                res.status(500).json({ error: 'Failed to add card to cart' });
            }
        });
         
}