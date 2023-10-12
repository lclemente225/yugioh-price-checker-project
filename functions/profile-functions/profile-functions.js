

//update username endpoint
app.put('/profile-update-user', async(req,res) => {
    let insertedNewUsername = req.body.newUserName;
  
    let passwordCheck = await req.db.query(
          `SELECT password, username FROM yugioh_price_checker_users 
          WHERE email = :email `, 
          {email: req.body.email}
      );
    const hashPW = passwordCheck[0][0].password; 
    const matchPassword = await bcrypt.compare(req.body.password, hashPW);
    console.log(passwordCheck[0])
   
    if(passwordCheck[0][0].username === insertedNewUsername){
        return res.json("That username is already in use")
    }
  
    if(matchPassword){
      const selectedProfile = await req.db.query(
                `UPDATE yugioh_price_checker_users 
                SET email = :newEmail 
                WHERE email = :email`,
                {
                  email: req.body.email,
                  newEmail: insertedNewEmail
                }
          );
  
        console.log('email changed to ', req.body.newEmail)
           return res.json(selectedProfile)
      }else{
        return res.status(500).json({ 
                                error: 'Failed to change the email' 
                                    });
      }
  })
  
  //update email endpoint
  app.put('/profile-update-email', async(req,res) => {
    let insertedNewEmail = req.body.newEmail;
  
    let infoCheck = await req.db.query(
      `SELECT email FROM yugioh_price_checker_users`);
    
    let isEmailInUse = false;
  
    infoCheck[0].map((emails) => {
      if(emails.email === insertedNewEmail){
        isEmailInUse = true;
      }
    })
  
    if(isEmailInUse){
      return res.json("Email already in use try another one")
    }else{
  
    let passwordCheck = await req.db.query(
      `SELECT password, email FROM yugioh_price_checker_users 
      WHERE email = :email`, 
      {email: req.body.email}
      );
  
    const hashPW = passwordCheck[0][0].password; 
    const matchPassword = await bcrypt.compare(req.body.password, hashPW);
  
    if(matchPassword){
      const selectedProfile = await req.db.query(
            `UPDATE yugioh_price_checker_users 
            SET email = :newEmail 
            WHERE email = :email`,
            {
              email: req.body.email,
              newEmail: insertedNewEmail
            } 
          );
  
        console.log('email changed to ', req.body.newEmail)
        //returning this variable will complete updating email
           return res.json(selectedProfile)
      }else{
        return res.status(500).json({ 
                                error: 'Failed to change the email' 
                                    });
      }
    }
  })
  
  //update password
  //req.body.password
  //req.body.newPassword
  //if it is not the same as database then put retype password
  //incomplete
  //NEED email, pw and new pw
  /*
  1. check given pw with database pw
  2. replace pw and hash it
  3. that's it  
  */
  
  app.put('/profile-update-pw', async(req,res) => {
    
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
        return res.json("That is your current password")
    }
  
  //if matchpw is true and email is true
  //hash new pw and replace it in db
    if(matchPassword && passwordCheck[0][0].email === req.body.email){
          let hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);
          const selectedProfile = await req.db.query(
                `UPDATE yugioh_price_checker_users 
                SET password = ${hashedNewPassword} 
                WHERE email = :email`,
                {
                  email: req.body.email
                }
              ); 
  
            console.log('PASSWORD CHANGED SUCCESS')
            return res.json(selectedProfile)
  
      }else{
        return res.status(500).json({ 
                                      error: 'Failed to change the passworod' 
                                    });
      }
  })
  
  //delete info
  //incomplete
  app.delete('/profile-delete', async(req, res) => {
        const getId = await req.db.query(
                  `SELECT id FROM yugioh_price_checker_users 
                  WHERE email = :email`,
                  {
                      email: req.body.email
                  }
              );
  
        const id = getId[0][0].id;
        const hashPW = passwordCheck[0][0].password; 
        const matchPassword = await bcrypt.compare(req.body.password, hashPW);
        console.log(passwordCheck[0]);
      
        if(matchPassword){
          
            console.log(`deleting`)
            await req.db.query(
              `DELETE FROM yugioh_price_checker_users WHERE id = ${id}`
              );
  
        } else {
          return res.status(500).json({message: "Wrong password"})
        }
  
  })
   