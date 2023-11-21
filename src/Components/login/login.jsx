import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { Cookies, useCookies } from "react-cookie";

function Login({LogIn, isLoggedIn,givenUserId, setUserId}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const navigate = useNavigate();

  async function handleLogin (e){
      e.preventDefault();
    try {
      const response = await fetch("/.netlify/functions/functions/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "username": username, "password": password }),
      });
      const loginData = await response.json();

      // check if login was successful
      //test: USER:test1 PASS:test1
      if (response.ok) {
        //use local storage instead of prop to store values so that 
        //they won't be refreshed when page is refreshed
        localStorage.setItem("Login Status", JSON.stringify(true));
        localStorage.setItem("Login Email", JSON.stringify(loginData.email));
        localStorage.setItem("Login UserId", JSON.stringify(loginData.userId));
        setCookie("accessToken", JSON.stringify(loginData.accessToken), 
        {
          maxAge: 120,
          path: '/'
        });
        navigate('/');
        console.log("Login successful! Showing Login Data", 
         loginData.Login,
         loginData.email,
         cookies
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
