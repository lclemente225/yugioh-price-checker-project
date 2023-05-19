import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  async function handleLogin (e){

    try {
      const response = await fetch("http://localhost:3003/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "username": username, "password":password }),
      });
      const loginData = await response.json();

      // check if login was successful
      //test: qwe qaqaqa
      if (response.ok) {
        localStorage.setItem("token", loginData.token)
        console.log("Login successful!", loginData.Login);
      } else {
        setLoginError(loginData.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

 
  return (
    <div className="login-container">
      <h1>Not Kaiba Corp</h1>
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
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
        <Link to="/">
        <button type="submit">Login</button>
        </Link>
      </form>
      {loginError && <p>{loginError}</p>}
    </div>
  );
}

export default Login;
