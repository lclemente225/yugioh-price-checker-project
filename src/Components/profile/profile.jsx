import React from 'react';
import { Link } from "react-router-dom";

const Profile = () => {
    //edit email
    //delete profile
    //change password
  return (
    <div>
      <div className="login-redirect-home">
        <Link to="/">
          <p>Home</p>
        </Link>
      </div>
      <h1 style={{marginTop: '200px'}}>
        You are a cool cat
      </h1>
    </div>
  )
}

export default Profile
