import React, {useState, useEffect} from 'react'

const ProfileInfo = () => {
  const [UserInfo, setUserInfo] = useState({
    email: "No email Set", 
    username: "Yugi Mutou"
  })

  const userId = JSON.parse(localStorage.getItem("Login UserId"));
  console.log(userId)
  async function getInfo(userId){
    

    try{
        const fetchInfo = await fetch(`/.netlify/functions/functions/profile/${userId}`,{
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

  useEffect(() => {
    getInfo(userId);
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
