const express = require('express');

const mysql = require('mysql2/promise');
const router = express.Router();
const bcrypt = require('bcryptjs');

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



//takes email, newUserName, username, password
router.put('/update-user', async(req,res) => {
  const insertedNewUsername = req.body.newUserName;
  const passwordCheck = await req.db.query(
        `SELECT id, password, username FROM yugioh_price_checker_users 
        WHERE email = :email `, 
        {email: req.body.email} 
    );
  const selectedId = passwordCheck[0][0].id;
  const hashPW = passwordCheck[0][0].password; 
  const matchPassword = await bcrypt.compare(req.body.password, hashPW);
 
 
  if(passwordCheck[0][0].username === insertedNewUsername){
      return res.status(500).json({message:"That username is already in use"})
  }

  if(!insertedNewUsername){
    return res.status(500).json({message:"new username is missing"})
  }

  if(matchPassword && insertedNewUsername){
    //this sql query updates username
    await req.db.query(
              `UPDATE yugioh_price_checker_users 
              SET username = :newUserName 
              WHERE id = :selectedId`,
              {
                selectedId: selectedId,
                newUserName: insertedNewUsername
              }
        ); 

      console.log('user changed to ', insertedNewUsername)
         return res.json({message:"username changed"})
    }else{
      return res.status(500).json({ 
                              error: 'Failed to change the username' 
                                  });
    }
}) 

//takes email, newEmail, username, password
router.put('/update-email', async(req,res) => {
    const insertedNewEmail = req.body.newEmail;
    const infoCheck = await req.db.query(
      `SELECT email FROM yugioh_price_checker_users`
        );

    infoCheck[0].forEach((emails) => {
        console.log("this is emails:",emails)
        if(emails.email === insertedNewEmail){
          return res.status(500).json({error: "This email is already in use."})
        }
    })
    
    const passwordCheck = await req.db.query(
      `SELECT password, email FROM yugioh_price_checker_users 
      WHERE email = :email AND username = :username`, 
      {
        email: req.body.email,
        username: req.body.username
      });
    const hashPW = passwordCheck[0][0].password; 
    const matchPassword = await bcrypt.compare(req.body.password, hashPW);

    if(matchPassword){
          await req.db.query(
                `UPDATE yugioh_price_checker_users 
                SET email = :newEmail 
                WHERE email = :email`,
                {
                  email: req.body.email,
                  newEmail: insertedNewEmail
                } 
              );
            //console.log('email changed to ', req.body.newEmail)
          return res.status(500).json({message: "email is successfully changed"})
    }else{
        return res.status(500).json({error: 'Failed to change the email'});
    }
  
})


//takes email, password, newPassword
router.put('/update-pw', async(req,res) => {
  //email, pw, newpw
   let passwordCheck = await req.db.query(
        `SELECT password, email FROM yugioh_price_checker_users 
        WHERE email = :email `, 
        {email: req.body.email}
    );
  const newPW = req.body.newPassword;
  const hashPW = passwordCheck[0][0].password; 
  const matchPassword = await bcrypt.compare(req.body.password, hashPW);
  console.log(passwordCheck[0]) 
 

  if(matchPassword && req.body.password === newPW){
      return res.status(500).json({message:"That is your current password"})
  }

//if matchpw is true and email is true
//hash new pw and replace it in db
  if(matchPassword){
        let hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);
        const selectedProfile = await req.db.query(
              `UPDATE yugioh_price_checker_users 
              SET password = :newPassword
              WHERE email = :email`,
              {
                newPassword: hashedNewPassword,
                email: req.body.email
              }
            ); 

          console.log('PASSWORD CHANGED SUCCESS')
          return res.status(200).json({message: "changed password successful"})

    }else{
      return res.status(500).json({ 
                                    error: 'Failed to change the password' 
                                  });
    } 
})

//takes email, 
router.delete('/delete', async(req, res) => {
      const getId = await req.db.query(
                `SELECT id FROM yugioh_price_checker_users 
                WHERE email = :email`,
                {
                    email: req.body.email
                }
            );
      let passwordCheck = await req.db.query(
        `SELECT password, email FROM yugioh_price_checker_users 
        WHERE email = :email`, 
        {email: req.body.email}
      );
      const id = getId[0][0].id;
      const hashPW = passwordCheck[0][0].password; 
      const matchPassword = await bcrypt.compare(req.body.password, hashPW);
      console.log(passwordCheck[0]);

      if(!id){
        return res.status(500).json({message: "Wrong Email"})
      }
    
      if(matchPassword){
        
          console.log(`deleting`)
          await req.db.query(
            `DELETE FROM yugioh_price_checker_users WHERE id = ${id}`
            );

      } else {
        return res.status(500).json({message: "Wrong password"})
      }

})
 
export {router}