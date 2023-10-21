import React, {useState} from 'react'

const ProfileInfo = () => {
  const [UserInfo, setUserInfo] = useState({
    email: "No email Set", 
    username: "Yugi Mutou"
  })


  async function getInfo(){
    
  const userId = localStorage.getItem("Login UserId");

  try{
    const fetchInfo = await fetch(`/.netlify/functions/functions/user/${userId}`,{
      method: "GET",
      headers: {"Content-Type": "application/json"}
    })

    const profileInfo = await fetchInfo.json();

    setUserInfo({
      email: profileInfo.email,
      username: profileInfo.username
    })
    
  }catch(error){
    console.log("no user detected")
  }

  }

  return (
    <div style={{
        height: "150px", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
        }}>
      <div className='profile-form-input'>
        <h2>Username: {UserInfo.username}</h2>
      </div>

      <div className='profile-form-input'>
        <h2>Email: {UserInfo.email}</h2>
      </div>
    </div>
  )
}

export default ProfileInfo
