import "./navbar.css";
import {Link, useNavigate} from "react-router-dom";
import useAccessToken from "../../protected-route/authfn";

export default function Navbar() {
    const {removeAccessToken, accessTokenObj} = useAccessToken()
    
    let loginStatus = accessTokenObj.status;

    function handleLogOut(){
      removeAccessToken();
      useNavigate('/login');
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
              {loginStatus === "user" ? <Logout/> : <LoginLinks/>}
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
