import React, {useState} from 'react';
import { Link } from "react-router-dom";
import './profile.css';
import {EditUser, EditEmail, EditPW} from "./profile-components";


const Profile = () => {
  const [selectedProfileForm, selectProfileForm] = useState({});
  const [profileFormData, setProfileFormData] = useState({
    username: "",
    newUserName: "",
    email: "",
    newEmail: "",
    password: "",
    newPassword: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //fetch put
};
    function ProfileNavbar(){
      return (
        <div className="profile-nav--top">
          <nav className="profile-navbar">  
              <a className="navbar-brand" href="/">
                <h1>
                Not Kaiba Corp
                </h1>
              </a>
          </nav>
        </div>
      )
    }

  return (
    <div>
        <ProfileNavbar/>
        <div className="profile-body">
          <div>
              <h1 className='profile-title'>Profile Settings</h1>
          </div>
              <div className='profile-navigation'>
                  <div>
                      <h3>Edit Email</h3>
                  </div>
                  <div>
                      <h3>Edit Username</h3>
                  </div>
                  <div>
                      <h3>Edit Password</h3>
                  </div>
                  <div>
                    <h3>Delete Account</h3>
                  </div>
              </div>
            <form className='profile-form' onSubmit={handleSubmit}>
                <EditUser profileFormData={profileFormData} handleChange={handleChange}/>
            </form>
        </div>
    </div>
  )
}

export default Profile
