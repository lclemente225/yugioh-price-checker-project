import "./navbar.css";
import {Link, useNavigate} from "react-router-dom";

export default function Navbar() {
    
    let loginStatus = JSON.parse(localStorage.getItem("Login Status"));

    function handleLogOut(){
      localStorage.removeItem("Login Email");
      localStorage.removeItem("Login UserId");
      document.cookie = `
      accessToken = null;
      expires = null;
      path = /;
      `;
      localStorage.setItem("Login Status", false);
      //useNavigate('/login');
    }

    function Logout(){
    
      return (
        <>
        <div className="navbar-button">
          <Link to="/" onClick={handleLogOut}>
             <p>
              Log Out 
             </p>
          </Link>
        </div>
        <div className="navbar-button">
          <Link to="/profile">
            <p className="navbar-profile">
                Profile
            </p>
          </Link>
        </div>
      
        </>
      )
    }

    function LoginLinks(){
      return (
          <>
            <div className="navbar-button">
              <Link to="/login" >
                <p>
                  Login
                </p>
              </Link>
            </div>
            <div className="navbar-button">
              <Link to="/register" >
                <p>
                  Register 
                </p>
              </Link>
            </div>
          </>
      )
    }

   
  return (
    <div className="nav--top">
      <nav className="navbar navbar-nav-scroll">         
          <div className="navbar-login-links">
              {loginStatus ? <Logout/> : <LoginLinks/>}
          </div>

          <a className="navbar-brand" href="/">
            <h1>
            Not Kaiba Corp
            </h1>
          </a>

          <a href="/shoppinglist">
             <button id="shopping-list-button">Your Shopping List</button>
          </a>
     </nav>
    </div>
  )
}
