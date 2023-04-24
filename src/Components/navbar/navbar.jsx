import "./navbar.css";
import {Link} from "react-router-dom";

export default function Navbar() {
    
  return (
    <div className="nav--top">
      <nav className="navbar navbar-nav-scroll bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Not Kaiba Corp</a>
          <Link to="/shoppinglist">
          <button id="shopping-list">Your Shopping List</button>
          </Link>
        </div>
      </nav>
    </div>
  )
}
