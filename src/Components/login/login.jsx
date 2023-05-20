import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css"
import { faHandshakeAngle } from "@fortawesome/free-solid-svg-icons";

function Login({LogIn, isLoggedIn}) {
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
        localStorage.setItem("Login Status", true);
        localStorage.setItem("token", loginData.token)
        console.log("Login successful!", loginData.Login, loginData.token);
        console.log("CHECK LOG IN STATUS LOGIN PAGE",isLoggedIn)
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
      <h1>Not Kaiba Corp</h1>
      <h1>Login</h1>
      <form  className="login-form">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" onClick={handleLogin}>Login</button>
      </form>
      {loginError && <p>{loginError}</p>}
    </div>
  );
}

export default Login;
