import "./navbar.css";
import {Link} from "react-router-dom";

export default function Navbar() {
    
  return (
    <div className="nav--top">
      <nav className="navbar navbar-nav-scroll">   
          <div>
              <Link to="/login"><span>Login</span></Link>&nbsp;
              <Link to="/register"><span>Register</span></Link>
          </div>
          <Link to="/shoppinglist">
             <button id="shopping-list-button">Your Shopping List</button>
          </Link>
          <a className="navbar-brand" href="/">Not Kaiba Corp</a>
      </nav>
    </div>
  )
}
