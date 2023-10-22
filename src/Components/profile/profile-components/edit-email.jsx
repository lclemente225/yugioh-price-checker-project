import React from 'react'

const EditEmail = ({profileFormData, handleChange}) => {
  return (
    <>
      <div className='profile-form-input'>
        <label for="password">Username:</label>
        <input type="text" onChange={handleChange} className="edit-name" name="username" value={profileFormData.username}/>
      </div>

      <div className='profile-form-input'>
        <label for="edit-name">Email:</label>
        <input type="text" onChange={handleChange} className="new-user" name="email" value={profileFormData.email}/>
      </div>

      <div className='profile-form-input'>
        <label for="edit-name">New Email:</label>
        <input type="text" onChange={handleChange} className="new-email" name="newEmail" value={profileFormData.newEmail}/>
      </div>
      
      <div className='profile-form-input'>
        <label for="edit-name">Password:</label>
        <input type="text" onChange={handleChange} className="password" name="password" value={profileFormData.password}/>
      </div>
    </>
  )
}

export default EditEmail
