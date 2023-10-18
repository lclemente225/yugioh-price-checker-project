import React from 'react'

const EditUsername = ({profileFormData, handleChange}) => {
  return (
    <>
      <div className='profile-form-input'>
        <label for="password">Username:</label>
        <input type="text" onChange={handleChange} className="edit-name" name="username" value={profileFormData.username}/>
      </div>

      <div className='profile-form-input'>
        <label for="edit-name">New Username:</label>
        <input type="text" onChange={handleChange} className="new-user" name="newUserName" value={profileFormData.newUserName}/>
      </div>

      <div className='profile-form-input'>
        <label for="edit-name">Email:</label>
        <input type="text" onChange={handleChange} className="email" name="email" value={profileFormData.email}/>
      </div>

      <div className='profile-form-input'>
        <label for="edit-name">Password:</label>
        <input type="text" onChange={handleChange} className="password" name="password" value={profileFormData.password}/>
      </div>  
    </>
  )
}

export default EditUsername
