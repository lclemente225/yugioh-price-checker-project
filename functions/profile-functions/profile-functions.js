const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../helper/db');

router.use(db.mysqlConnection);

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

         return res.status(200).json({message:"username changed"})
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
    const passwordCheck = await req.db.query(
      `SELECT password, email FROM yugioh_price_checker_users 
      WHERE email = :email AND username = :username`, 
      {
        email: req.body.email,
        username: req.body.username
      });
    const hashPW = passwordCheck[0][0].password; 
    const matchPassword = await bcrypt.compare(req.body.password, hashPW);

    infoCheck[0].forEach((emails) => {
        //console.log("this is emails:",emails)
        if(emails.email === insertedNewEmail){
          return res.status(500).json({error: "This email is already in use."})
        }
    })
    
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
          return res.status(200).json({message: "email is successfully changed"})
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
        await req.db.query(
              `UPDATE yugioh_price_checker_users 
              SET password = :newPassword
              WHERE email = :email`,
              {
                newPassword: hashedNewPassword,
                email: req.body.email
              }
            ); 

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


router.get(`/:userId`, async(req,res) => {

  let profileInfo = await req.db.query(
        `SELECT email, username FROM yugioh_price_checker_users 
        WHERE userId = :userId `, 
        {userId: req.params.userId} 
      );
  const profileEmail = profileInfo[0][0].email;
  const profileUser = profileInfo[0][0].username;

  return res.status(200).json({
    "email": profileEmail,
    "username": profileUser
  })
})

 
export {router}