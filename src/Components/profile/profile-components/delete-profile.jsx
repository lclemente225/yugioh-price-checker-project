import React from 'react';

export default function DeleteConfirm({toggleDeleteAccountConfirm, handleChange, profileFormData}){
  const [deleteInfoConfirm, toggleConfirm] = React.useState(false);

/*   const axios = require('axios');
  let data = JSON.stringify({
    "email": "test1@gmail.com",
    "password": "test1"
  });
  
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: 'localhost:3000/profile/delete',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  let deleteInfo = axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  }); */
  
function deleteProfileSubmit(e){
  e.preventDefault();
  if(profileFormData.password === profileFormData.passwordConfirm){
    alert("Deleted Account")
  }else{
    alert("Passwords don't match")
  }

}
    return (
      <div className='delete-confirm-module'>
        <div className='delete-confirmation'>
          <div id="delete-modal-close" onClick={() =>{
             toggleDeleteAccountConfirm(false);
             toggleConfirm(false)
             }}>
            X
          </div>
          {
            deleteInfoConfirm ? 
            <>
              <form id="delete-form" onSubmit={(e) => deleteProfileSubmit(e)}>
                  <h1>Enter your info</h1>
                  <div className='delete-form-input'>
                    <label htmlFor="email">Email:</label>
                    <input type="email" onChange={handleChange}  name="email" value={profileFormData.email}/>
                  </div>

                  <div className='delete-form-input'>
                    <label htmlFor="password">Password:</label>
                    <input type="text" onChange={handleChange}  name="password" value={profileFormData.password}/>
                  </div>

                  {/* <div className='delete-form-input'>
                    <label htmlFor="password-confirm">Confirm Password:</label>
                    <input type="text" onChange={handleChange}  name="password-confirm" value={profileFormData.passwordConfirm}/>
                  </div>  */}
                   <div className='delete-form-input'>
          <label for="password">Username:</label>
          <input type="text" onChange={handleChange} className="edit-name" name="username" value={profileFormData.username}/>
        </div>
              </form> 
              <button type="submit" form="delete-form" value="Submit">
                DELETE PROFILE
              </button>
            </>
            :
            <>
            <div>
              <h1>
                Are you sure?
              </h1>
            </div>

            <div className='delete-account-button' onClick={() => toggleConfirm(true)}>
              Yes
            </div>
          </>
          }
          
          
        </div>
      </div>
    )
  }