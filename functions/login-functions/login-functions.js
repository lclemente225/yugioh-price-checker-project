const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');//generate random id
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(6);
//sql setup
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST_URL,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_USER
});

router.use(
    async function mysqlConnection(req, res, next) {
            try {
                    req.db = await pool.getConnection();

                    req.db.connection.config.namedPlaceholders = true;
                
                    // Traditional mode ensures not null is respected for unsupplied fields, ensures valid JavaScript dates, etc.
                    await req.db.query('SET SESSION sql_mode = "TRADITIONAL"');
                    await req.db.query(`SET time_zone = '-8:00'`);

                
                    await next();
                    req.db.release();
                    
            } catch (err) {
            // If anything downstream throw an error, we must r elease the connection allocated for the request
            
                    console.log(err)
                    if (req.db){
                        req.db.release();
                        }

                    throw err;
            }
    }
);

//put end points here
router.post('/register', async (req, res) => {

    const checkEmail = await req.db.query(
        `SELECT email FROM yugioh_price_checker_users  
        WHERE email = :email`,
        { email: req.body.email }
      );

    let userIdInfo = await req.db.query(
      `SELECT userId FROM yugioh_price_checker_users`
      )
      console.log(userIdInfo)
      

    let hashedPassword = await bcrypt.hash(req.body.password, salt);

    console.log(`REGISTERING 
    email:${req.body.email} 
    username:${req.body.username} 
    password:${req.body.password}
    hashed pass: ${hashedPassword}
    userID:${uuidv4()}`)

    try {
    if(checkEmail[0][0] != undefined){
        return console.error("email is already in use")
    }else if(checkEmail[0][0] != "" && req.body.password && req.body.username){
    
        const registration = await req.db.query(
          `INSERT INTO yugioh_price_checker_users
          (email, username, password, userId)
          VALUES( :email, :username, :password, :userId)`,
          {
              email: req.body.email,
              username: req.body.username,
              password: hashedPassword,
              userId: uuidv4()
          }
        )
          console.log("successfully registered new user")   

    }else{
        res.status(500).json({ error: 'Failed to register' });
        return console.error("please enter an email")
    };
      
    }catch(err){
        res.status(500).json({ error: 'Failed to register' });
    }
});


router.get('/checkUserId', async (req, res) => {
   try{
        const getUserId = await req.db.query(`
        SELECT userId, email FROM yugioh_price_checker_users`)
        
          return res.json(getUserId)
  }
  catch (error) {
        console.error('Error while querying userId:', error);
        return res.status(500).json({ error: 'Internal Server Error no check user id' });
  } 
})
 

router.post('/login', async (req, res) => { 
  
    console.log("logging in")
    const userInfo = await req.db.query(
      `SELECT id, email, userId, password, username FROM yugioh_price_checker_users 
      WHERE username = :username `, 
      {username: req.body.username}
      );

      if(res.statusCode === null){
          return res.json({message:"you got the wrong user or pass buddy"})
      }
    const hashPW = userInfo[0][0].password; 
    const matchPassword = await bcrypt.compare(req.body.password, hashPW);
    
    if(matchPassword){ 
        console.log("Login Successful",res.statusCode) 
        //set jwt key here
        const email = userInfo[0][0].email;
        const id = userInfo[0][0].id;
        const userId = userInfo[0][0].userId;
        const token = jwt.sign({id}, "jwtsecretkey", {expiresIn: 300})
        
        return res.json({Login:true, "accessToken":token, "email":email, "userId":userId}).redirect('https://ygo-pricechecker.netlify.app/')
    }else{
        return res.status(401).json({message:"Wrong user or PASSWORD"})
    }
 

})



export {router}