import React from 'react';
import { Link } from "react-router-dom";

function searchResults({searchInfo, setSearchInfo}) {
    function SearchNav(){
      return (
        <div className="nav--top">
      <nav className="navbar navbar-nav-scroll">   
          <div>
              <Link to="/"><span>Go back</span></Link>
          </div>
         
          <a className="navbar-brand" href="/">Not Kaiba Corp</a>
      </nav>
    </div>
      )
    }
  return (
    <div>
      <SearchNav />
      
    </div>
  )
}

export default searchResults
