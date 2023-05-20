import "./navbar.css";
import {Link} from "react-router-dom";

export default function Navbar({LogIn, isLoggedIn}) {
    //if LogIn = true then change the links to logout
    
    let loginStatus = localStorage.getItem("Login Status");
    console.log("CHECKING log status navbar",loginStatus)
    function Logout(){
     localStorage.setItem("Login Status", false)
      return (
        <>
        <a href="/">Log Out</a>
        </>
      )
    }

    function LoginLinks(){
      return (<>
              <a href="/login">Login</a>&nbsp;
              <a href="/register">Register</a>
              </>
      )
    }
    function LoginLinksRendering() {
      if (loginStatus === true) {
        return <Logout />;
      } else {
        return <LoginLinks />;
      }
    }
  return (
    <div className="nav--top">
      <nav className="navbar navbar-nav-scroll">   
          <div className="navbar-login-links">
              {<LoginLinksRendering />}
          </div>
          <Link to="/shoppinglist">
             <button id="shopping-list-button">Your Shopping List</button>
          </Link>
          <a className="navbar-brand" href="/">Not Kaiba Corp</a>
      </nav>
    </div>
  )
}
