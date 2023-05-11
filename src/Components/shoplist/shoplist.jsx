import React from 'react';
import {Link} from "react-router-dom";
import './shoplist.css';
import { useQuery } from 'react-query';


const Shoplist = () => {
//how do you go about clicking an item and adding it to the list?

//need to make a button that will obtain info about the item
//maybe put the info into a state?
//send state as props to list?


// fetch get req > obtain info

//fetch put req > update info
//let card-index = data.card_name.indexOf(); data[card-index].id > this is the id to be selected 
//and placed in the fetch link 

//maybe this is the get req data?
//add state to an array
//map over array and render
//mock array
//need to place info in here

const { isLoading, error, data } = useQuery('Yugioh Data', 
async () =>{
      let response =  await fetch( 'http://localhost:3003/cart/list');
      let data = await response.json();   
          return data
          }, []);


//put this into a useEffect function
//make it so that it will re-render when the quantity is changed
function ListItems() {

let cardList = data[0];
if(cardList != undefined){
return cardList.map((item) => {
    console.log("ITEMS",item)
    return (
    <>
        <li key={item.id} className='shop-list-item'>
        <p>{item.card_name}</p>    
        <p>Quantity: {item.quantity}</p>
        </li>
    </>         
        )
    });
}
else{
    return console.error(cardList,"cardlist didn't load in cart")
}
}

    
//for each add a button to add 1x more or remove
//either a post or delete request
//delete request

 //put req to subtract quantity
   function subtractQuantityFromCart(){
    console.log('subtracting 1')
   }



  return (
    <div>
        <div className='container'>
            <h1>Your Shopping List</h1>
            <Link to="/">
                <button>
                    Go Home
                </button>
            </Link>
       </div>
    <div id="shop-list-container" className='container'>
        <ul>
        {isLoading ? <div>Loading...</div> : error ? <div>Error: {error}</div> : <ListItems />}
        </ul>
    </div>

    </div>
  )
}

export default Shoplist
