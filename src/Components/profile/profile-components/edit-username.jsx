import React from 'react'

const EditUsername = ({profileFormData}) => {
  return (
    <>
      <label for="password">Username:</label>
      <input type="text" className="edit-name" name="username" value={profileFormData.username}/>

      <label for="edit-name">New Username:</label>
      <input type="text" className="new-user" name="newUserName" value={profileFormData.newUserName}/>

      <label for="edit-name">Password:</label>
      <input type="text" className="password" name="password" value={profileFormData.password}/>

      <label for="edit-name">Email:</label>
      <input type="text" className="email" name="email" value={profileFormData.email}/>
    </>
  )
}

export default EditUsername
