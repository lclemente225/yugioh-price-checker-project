import React, {useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
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
  const userId = JSON.parse(localStorage.getItem("Login UserId"));
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
    newPassword: "",
    passwordConfirm:""
  });
  const [UserInfo, setUserInfo] = useState({
    email: "No email Set", 
    username: "Yugi Mutou"
  })

  
let editUserfn = async () => {
  await axios.put('/.netlify/functions/functions/profile/update-user',
    profileFormData, 
    {
      headers:{
        'Content-Type': 'application/json'
      }
    })
}

let editEmailfn = async () => {
  await axios.put('/.netlify/functions/functions/profile/update-email',
    profileFormData, 
    {
      headers:{
        'Content-Type': 'application/json'
      }
    })
}

  async function getInfo(userId){

    try{
          const fetchInfo = await fetch(`/.netlify/functions/functions/profile/${userId}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"}
          })
          return await fetchInfo.json();

    }catch(error){
        console.log("no user detected")
    }
  }
  React.useEffect(() => {
    const profileInfo = getInfo(userId);
    setUserInfo((obj) => ({...obj, username: profileInfo.username}));
    console.log("finished loading userinfo");
  () => {
    return console.log("dunzo")
  }
}, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    console.log("submitting")
    try{
    if(selectedProfileForm.editUser){
       return editUserfn
      }else if(selectedProfileForm.editEmail){
         return editEmailfn
        }else{
          return alert("nothing to submit");
        }
  }catch(error){
    console.log("Error:", error)
  }

    /*
    body in fetch put req
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
    //if editUser then execute this function
  };

  return (
    <div>
        <ProfileNavbar/>
        {deleteAccountConfirm && <DeleteConfirm toggleDeleteAccountConfirm={toggleDeleteAccountConfirm} profileFormData={profileFormData} handleChange={handleChange}/>}
        <div className="profile-body">
          <div className='profile-welcome-title'>
              <h1>Hello {UserInfo.username}</h1>
          </div>
          <div className='profile-title'>
              <h1 style={{fontSize: "1.3rem"}}>Profile Settings</h1>
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
            {selectedProfileForm.profileInfo && <ProfileInfo userId={userId} getInfo={getInfo} UserInfo={UserInfo} setUserInfo={setUserInfo} />}
          <form className='profile-form' onSubmit={handleSubmit}>
              {selectedProfileForm.editUser && <EditUser profileFormData={profileFormData} handleChange={handleChange}/>}
              {selectedProfileForm.editEmail && <EditEmail profileFormData={profileFormData} handleChange={handleChange}/>}
              {selectedProfileForm.editPassword && <EditPW profileFormData={profileFormData} handleChange={handleChange}/>}
              
            { !selectedProfileForm.profileInfo &&
              <button type="submit">
              {selectedProfileForm.editUser && 'Edit User'}
              {selectedProfileForm.editEmail && 'Edit Email'}
              {selectedProfileForm.editPassword && 'Change Password'}
            </button>}
          </form>
        </div>
    </div>
  )
}

export default Profile
