import "./navbar.css";
import {Link, useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Navbar() {
  
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    
    let loginStatus = JSON.parse(localStorage.getItem("Login Status"));

    function handleLogOut(){
      console.log("logging out")
      localStorage.removeItem("Login Email");
      localStorage.removeItem("Login UserId");
      localStorage.setItem("Login Status", false);
      removeCookie(["accessToken"]);
      useNavigate('/login');
    }
/* 
    if(cookies.accessToken){
      console.log("THIS IS THE COOKIE", cookies.accessToken)
    }else{
      console.log("no cookie")
    }
 */
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
