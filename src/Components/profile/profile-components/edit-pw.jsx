import React from 'react'

const EditPW = ({profileFormData, handleChange}) => {
  return (
    <>
      <div className='profile-form-input'>
        <label for="email">Email:</label>
        <input type="email" onChange={handleChange} className="new-email" name="email" value={profileFormData.email}/>
      </div>

      <div className='profile-form-input'>
        <label for="password">Password:</label>
        <input type="text" onChange={handleChange} className="password" name="password" value={profileFormData.password}/>
      </div>

      <div className='profile-form-input'>
        <label for="newPassword">New Password:</label>
        <input type="text" onChange={handleChange} className="new-password" name="newPassword" value={profileFormData.newPassword}/>
      </div>
    </>
  )
}

export default EditPW
