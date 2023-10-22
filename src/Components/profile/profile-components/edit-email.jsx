import React from 'react'

const EditEmail = ({profileFormData, handleChange}) => {
  return (
    <>
      <div className='profile-form-input'>
        <label for="password">Username:
          <input type="text" onChange={handleChange} className="edit-name" name="username" value={profileFormData.username}/>
        </label>
      </div>

      <div className='profile-form-input'>
        <label for="edit-name">Email:
          <input type="text" onChange={handleChange} className="new-user" name="email" value={profileFormData.email}/>
        </label>
      </div>

      <div className='profile-form-input'>
        <label for="edit-name">New Email:
          <input type="text" onChange={handleChange} className="new-email" name="newEmail" value={profileFormData.newEmail}/>
        </label>
      </div>
      
      <div className='profile-form-input'>
        <label for="edit-name">Password:
          <input type="text" onChange={handleChange} className="password" name="password" value={profileFormData.password}/>
        </label>
      </div>
    </>
  )
}

export default EditEmail
