import React, { useState } from "react";
import {Link} from "react-router-dom";
import "./register.css";
import { useQuery } from 'react-query';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleSubmit = (event) => {
    event.preventDefault();
    //randomly generate user id here?
    const userData = { 
                    "username":username, 
                    "email":email, 
                    "password":password
                  };
    // Send the user data to an API endpoint
    fetch("http://localhost:3003/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Registered successfully:", data);
        // Handle any success cases, such as redirecting to a login page
      })
      .catch((error) => {
        console.error("Error in Registering:", error);
        // Handle any error cases
      });
  };


  return (
    <div className="container-fluid register-container">
      <Link to='/' style={{textDecoration:'none'}}>
          <h1 className="form-company-name" style={{textDecoration:'none'}}>
            Not Kaiba Corp
          </h1>
      </Link>
    <form onSubmit={handleSubmit} className="register-form">
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Email: 
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit" className="register-button">Register</button>
    </form>
    </div>
  );
}

export default Register;
