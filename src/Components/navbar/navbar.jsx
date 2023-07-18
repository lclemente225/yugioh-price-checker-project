import "./navbar.css";
import {Link} from "react-router-dom";

export default function Navbar() {
    
    let loginStatus = JSON.parse(localStorage.getItem("Login Status"));
    console.log("CHECKING log status navbar",loginStatus)

    function handleClick(){
      localStorage.removeItem("Login Email");
      localStorage.removeItem("Login UserId");
      localStorage.setItem("Login Status", false)
    }

    function Logout(){
    
      return (
        <>
        <a href="/" onClick={handleClick}>Log Out</a>
        <Link to="/profile">
            Profile
        </Link>
        </>
      )
    }

    function LoginLinks(){
      return (
          <>
              <a href="/login">Login</a>&nbsp;
              <a href="/register">Register</a>
          </>
      )
    }

   
  return (
    <div className="nav--top">
      <nav className="navbar navbar-nav-scroll">         
          <div className="navbar-login-links">
              {loginStatus ? <Logout/> : <LoginLinks/>}
          </div>

          <a className="navbar-brand" href="/">Not Kaiba Corp</a>

          <Link to="/shoppinglist">
             <button id="shopping-list-button">Your Shopping List</button>
          </Link>
     </nav>
    </div>
  )
}
