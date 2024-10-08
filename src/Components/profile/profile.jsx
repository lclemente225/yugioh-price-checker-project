import React, {useState, Suspense, useTransition} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './profile.css';
import { EditUser,EditEmail, EditPW, DeleteConfirm, ProfileInfo} from "./profile-components";
//import LazyLoad from './lazyLoadProfile';


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
  const [profileOptionShow, profileOptionShowToggle] = useState(false)
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
  const [isPending, startTransition] = useTransition();
  //const EditUser = LazyLoad('./profile-components/edit-username', 'EditUsername')
  
  let editUserfn = async () => {
    console.log("profile form data:", profileFormData)
    await fetch('/.netlify/functions/functions/profile/update-user',
      {
        method:"PUT",
        headers:{
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(profileFormData)
      }).then((res) => {
        console.log("Successfully Edited Username", res.message)
      }).catch((error) => {
        console.log("Error Editing USer:", error) 
      })
  }

  let editEmailfn = async () => {

    console.log("profile form data:", profileFormData)
    await fetch('/.netlify/functions/functions/profile/update-email',
      {
        method: "PUT",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileFormData)
      }).then((res) => {
        let response = JSON.stringify(res.json());
        console.log("Successfully Edited Email", response);
      }).catch((error) => {
        console.log("Error Editing Email:", error) 
      })
  }

  async function getInfo(userId){

    try{
          const fetchInfo = await fetch(`/.netlify/functions/functions/profile/${userId}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"}
          })
          const profileInfo = await fetchInfo.json();
          
          if(profileInfo) setUserInfo({email: profileInfo.email, username: profileInfo.username});

    }catch(error){
        console.log("no user detected")
    }
  }

  React.useEffect(() => {
      getInfo(userId);
      return
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitting")
    try{
    if(selectedProfileForm.editUser){
       editUserfn()
       return console.log("submit edit user")
      }else if(selectedProfileForm.editEmail){
        editEmailfn()
        return console.log("submit edit email")
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
        <div className='profile-body'>
          <div className='profile-welcome-title'>
              <h1>Hello {UserInfo.username}</h1>
          </div>
          <div className='profile-title'>
              <h1 style={{fontSize: "1.3rem"}}>Profile Settings</h1>
          </div>
          <div className='profile-options' onClick={() => profileOptionShowToggle(x => !x)}>
           {profileOptionShow ? 'Hide Profile Options' : 'Show Profile Options' }
          </div>
          <div className={`profile-navigation ${profileOptionShow && 'option-show'}`}>
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
          {/* <Suspense fallback={<h1>Loading</h1>}> */} 
            {selectedProfileForm.profileInfo && <ProfileInfo userId={userId} getInfo={getInfo} UserInfo={UserInfo} setUserInfo={setUserInfo} />}
          
          <form className='profile-form' onSubmit={handleSubmit}>
              {
                selectedProfileForm.editUser && 
                <EditUser profileFormData={profileFormData} handleChange={handleChange}/>
              }
              {
                selectedProfileForm.editEmail && 
                <EditEmail profileFormData={profileFormData} handleChange={handleChange}/>
              }
              {
                selectedProfileForm.editPassword && 
                <EditPW profileFormData={profileFormData} handleChange={handleChange}/>
              }
              
            { 
              !selectedProfileForm.profileInfo &&
              <button type="submit">
                {selectedProfileForm.editUser && 'Edit User'}
                {selectedProfileForm.editEmail && 'Edit Email'}
                {selectedProfileForm.editPassword && 'Change Password'}
              </button> 
            }
          </form>
          {/* </Suspense> */}
        </div>
    </div>
  )
}

export default Profile
