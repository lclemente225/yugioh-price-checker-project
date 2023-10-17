import React from 'react'

const EditUsername = ({value}) => {
  return (
    <>
      <label for="password">Username:</label>
      <input type="text" className="edit-name" name="username" value={value.username}/>

      <label for="edit-name">New Username:</label>
      <input type="text" className="new-user" name="newUserName" value={value.newUserName}/>

      <label for="edit-name">Password:</label>
      <input type="text" className="password" name="password" value={value.password}/>

      <label for="edit-name">Email:</label>
      <input type="text" className="email" name="email" value={value.email}/>
    </>
  )
}

export default EditUsername
