import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAccessToken from "../../protected-route/authfn";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const {setAccessToken} = useAccessToken()

  async function handleLogin (e){
      e.preventDefault();
    try {
      const response = await fetch("/.netlify/functions/functions/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "username": username, "password": password }),
      });
      const loginData = await response.json();

      if (response.ok) {
        let loginClientData = {
          "status": "user",
          "email": loginData.email,
          "userID": loginData.userId,
          "token": loginData.accessToken
        }
        
        setAccessToken(loginClientData);
        navigate('/');
         
      } else {
        setLoginError(loginData.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
 
  return (
    <div className="login-container">
      <div className="login-redirect-home">
        <Link to="/">
          <p>Home</p>
        </Link>
      </div>
      <h1 className="form-company-name">
        Not Kaiba Corp
      </h1>
      <h1 className="form-company-name">
        Login
      </h1>
      <form  className="login-form">
        <div id="demo-login">
          <p>Demo Account</p>
          <p>User: test1</p>
          <p>Pass: test1</p>
        </div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br/>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br/>
        <button type="submit" onClick={handleLogin}>Login</button>
      </form>
      {loginError && <p>{loginError}</p>}
    </div>
  );
}

export default Login;
