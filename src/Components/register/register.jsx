import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import "./register.css";
import { useQuery } from 'react-query';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState({status: false, message: ""});
  const navigate = useNavigate()


  const handleSubmit = (event) => {
    event.preventDefault();
    
    const userData = { 
                    "username":username, 
                    "email":email, 
                    "password":password
                  };
    // Send the user data to an API endpoint
    fetch("/.netlify/functions/functions/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status === 401){
          console.log("error", data)
          setRegisterError({
            status: true,
            message: data.message
          })
          return
        } else {
          setRegisterError({
            status: true,
            message: data.message
          })
          //can put a email verification here
          navigate('/login');
        }
        // Handle any success cases, such as redirecting to a login page
      })
      .catch((error) => {
        setRegisterError({
          status: true,
          message: error
        })
        console.error("Error in Registering:", error);
        // Handle any error cases
      });
  };
 
  function confirmEmail(emailInput){
    if(email === emailInput || checkEmail === emailInput){
      setRegisterError({status: false, message: ""})
      return true
    } else {
      setRegisterError({status: true, message: "emails do not match"})
      return false
    }
  }

  return (
    <div className="container-fluid register-container">
        <div className="login-redirect-home">
          <Link to="/">
            <p>Home</p> 
          </Link>
        </div>
        <h1 className="form-company-name">
            Not Kaiba Corp
        </h1>
        <h1 className="form-company-name">
        Register
      </h1>
    <form onSubmit={handleSubmit} className="register-form">          
    {registerError.status && <span className="register-error">{registerError.message} </span>}
      <div className="register-form-container">
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>

          <label>
            Email: 
            <input
              type="email"
              value={email}
              onChange={(event) => { 
                setEmail(event.target.value)
                confirmEmail(event.target.value)
              }}
              required
            />
          </label>
          <label>
            Confirm Email: 
            <input
              type="email"
              value={checkEmail}
              onChange={(event) => {
                setCheckEmail(event.target.value)
                confirmEmail(event.target.value)
              }}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
      </div>
      
      <button type="submit" className="register-button">Register</button>
    </form>
    </div>
  );
}

export default Register;
