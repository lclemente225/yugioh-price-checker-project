import React from 'react';
import {Link} from "react-router-dom";


const Shoplist = () => {

//how do you go about clicking an item and adding it to the list?

//need to make a button that will obtain info about the item
//maybe put the info into a state?
//send state as props to list?
//add state to an array
//map over array and render
//for each add a button to ad 1x more or remove


  return (
    <div>
      shopping whoohoo
      <Link to="/">
        <button>
            Go Home
        </button>
      </Link>
    </div>
  )
}

export default Shoplist
