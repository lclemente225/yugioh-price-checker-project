import React, {useState, useEffect} from 'react'

const ProfileInfo = ({getInfo, UserInfo, setUserInfo, userId}) => {


 

  useEffect(() => {
    const profileInfo = getInfo(userId); 
    setUserInfo({
      email: profileInfo.email,
      username: profileInfo.username
    });

    () => {
      console.log("stoppewd effect")
    }
  }, [])

  return (
    <div style={{
        height: "150px", 
        display: "flex",  
        flexDirection: "column",
        justifyContent: "space-between"
        }}>
      <div className='profile-form-input'>
        <h2>Your Username: {UserInfo.username}</h2>
      </div>

      <div className='profile-form-input'>
        <h2>Your Email: {UserInfo.email}</h2>
      </div>
    </div>
  )
}

export default ProfileInfo
