import React from 'react'

const ProfileInfo = () => {
  return (
    <div style={{
        height: "150px", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
        }}>
      <div className='profile-form-input'>
        <h2>Username: User</h2>
      </div>

      <div className='profile-form-input'>
        <h2>Email: Email</h2>
      </div>
    </div>
  )
}

export default ProfileInfo
