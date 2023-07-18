import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css"
import { faHandshakeAngle } from "@fortawesome/free-solid-svg-icons";

function Login({LogIn, isLoggedIn,givenUserId, setUserId}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  async function handleLogin (e){
      e.preventDefault();
    try {
      const response = await fetch("http://localhost:3003/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "username": username, "password":password }),
      });
      const loginData = await response.json();

      // check if login was successful
      //test: USER:qwe PASS:qaqaqa
      if (response.ok) {
        //use local storage instead of prop to store values so that 
        //they won't be refreshed when page is refreshed
        localStorage.setItem("Login Status", JSON.stringify(true));
        localStorage.setItem("Login Email", JSON.stringify(loginData.email));
        localStorage.setItem("Login UserId", JSON.stringify(loginData.userId));
        localStorage.setItem("token", JSON.stringify(loginData.accessToken));
        console.log("Login successful! Showing Login Data", 
        loginData.Login,
         loginData.accessToken,
         loginData.email
         );
         
      } else {
        setLoginError(loginData.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };


 
  return (
    <div className="login-container">
      <a className="login-redirect-home" href="/">Home</a>
      <h1 className="form-company-name">Not Kaiba Corp</h1>
      <h1 className="form-company-name">Login</h1>
      <form  className="login-form">
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
