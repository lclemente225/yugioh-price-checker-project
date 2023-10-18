import React, {useState} from 'react';
import { Link } from "react-router-dom";
import './profile.css';
import {EditUser, EditEmail, EditPW, DeleteConfirm, ProfileInfo} from "./profile-components";


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

const Profile = () => {
  const [selectedProfileForm, selectProfileForm] = useState({
    editEmail: false,
    editUser: false,
    editPassword: false,
    profileInfo: true
  });
  const [deleteAccountConfirm, toggleDeleteAccountConfirm] = useState(false);
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
    /*
    body in fetch req
    {
      username: profileFormData.username,
      newUserName: profileFormData.newUserName,
      email: profileFormData.email,
      newEmail: profileFormData.newEmail,
      password: profileFormData.password,
      newPassword: profileFormData.newPasswordka
    }
    */
    //fetch put
  };

  return (
    <div>
        <ProfileNavbar/>
        {deleteAccountConfirm && <DeleteConfirm toggleDeleteAccountConfirm={toggleDeleteAccountConfirm}/>}
        <div className="profile-body">
          <div className='profile-welcome-title'>
              <h1>Hello User!</h1>
          </div>
          <div className='profile-title'>
              <h1>Profile Settings</h1>
          </div>
          <div className='profile-navigation'>
              <div onClick={() => selectProfileForm(() => ({profileInfo: true, editEmail: false, editUser: false, editPassword: false}))}
                className={`${selectedProfileForm.profileInfo && 'selectedProfile'} profile-selection`}>
                  <h3>Your Information</h3>
              </div>

              <div onClick={() => selectProfileForm(() => ({profileInfo: false, editEmail: true, editUser: false, editPassword: false}))}
                className={`${selectedProfileForm.editEmail && 'selectedProfile'} profile-selection`}>
                  <h3>Edit Email</h3>
              </div>

              <div onClick={() => selectProfileForm(() => ({profileInfo: false, editEmail: false, editUser: true, editPassword: false}))}
                className={`${selectedProfileForm.editUser && 'selectedProfile'} profile-selection`}>
                  <h3>Edit Username</h3>
              </div>

              <div onClick={() => selectProfileForm(() => ({profileInfo: false, editEmail: false, editUser: false, editPassword: true}))}
                className={`${selectedProfileForm.editPassword && 'selectedProfile'} profile-selection`}>
                  <h3>Reset Password</h3>
              </div>

              <div className='profile-selection' onClick={() => toggleDeleteAccountConfirm(true)}>
                <h3>Delete Account</h3>
              </div>
          </div>
            {selectedProfileForm.profileInfo && <ProfileInfo />}
          <form className='profile-form' onSubmit={handleSubmit}>
              {selectedProfileForm.editUser && <EditUser profileFormData={profileFormData} handleChange={handleChange}/>}
              {selectedProfileForm.editEmail && <EditEmail profileFormData={profileFormData} handleChange={handleChange}/>}
              {selectedProfileForm.editPassword && <EditPW profileFormData={profileFormData} handleChange={handleChange}/>}
          </form>
        </div>
    </div>
  )
}

export default Profile
