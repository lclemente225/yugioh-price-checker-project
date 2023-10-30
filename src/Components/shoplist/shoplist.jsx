import React from 'react';
import './shoplist.css';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { addToCartinCart, subtractFromCartinCart, deleteFromCartinCart } from '../action-functions/action-functions';

/**
 * 
 SAVING AN OBJECT INTO LOCAL STORAGE
 // creating an object
const myCountryInfo = {
  country: 'India',
  capital: 'New Delhi'
}

// stringifying the myCountryInfo object and 
// storing it in the localStorage
localStorage.setItem('myCountryInfo', JSON.stringify(myCountryInfo))

let test = JSON.parse(localStorage.getItem("myCountryInfo"));
// retrieving localStorage data in HTML
document.getElementById("content").innerHTML = test.country;
 */


const Shoplist = ({givenUserId}) => {

const firstAPISite = process.env.REACT_APP_API_SITE_2;
console.log("firstyapisite", firstAPISite);
console.log("databaseport", process.env.DATABASE_PORT)
const { isLoading, error, data, refetch, isStale } = useQuery('Yugioh Cart Data', 
      async () =>{
                let response =  await fetch(`${firstAPISite}/cart/list`);
                let data = await response.json();   
                console.log("trying to load cart")
                return data
          },{
            refetchOnWindowFocus: false,
            retry: 1
          },
          []);
          
if(isLoading){
  return <div className='Loading-API-Text'>Loading...</div>
}
if(error){
  return (
        <div className='Loading-API-Text'>
          Something went wrong loading cart...
          <a href="/"><h3>Go Home</h3></a>
        </div>
        )
}


function ListItems() {

    let cardList = data[0];
    //console.log("rendering list")
    console.log("cardList: ",cardList)
    //console.log("data: ",data)
    if(cardList != undefined){
        return cardList.map((item) => {
          
            let shopListItems = {
                "card-name":item.card_name,
                "quantity": item.quantity
            };

           //if(givenUserId === 0) localStorage.setItem("No User Shop List", JSON.stringify(shopListItems))
           
            if(givenUserId === item.userId){
              return (
                <li key={item.id} className='shop-list-item'>
                <p className="card-listing-text">{item.card_name}</p>    
                <p className="card-listing-text">Quantity: {item.quantity}</p>
                    <button 
                    className='cartUpdateButton cartUpdateAdd'
                    onClick={(event) => { 
                                      addToCartinCart(event, item.card_name, item.price, item.cartId, givenUserId);
                                      setTimeout(refetch(["Yugioh Cart Data"]),1000) 
                                    }}>
                      +</button>
                    &nbsp;
                    <button 
                    className='cartUpdateButton cartUpdateSubtract'
                    onClick={(event) => { 
                                      subtractFromCartinCart(event, item.cartId, givenUserId) 
                                      setTimeout(refetch(["Yugioh Cart Data"]),1000)
                                      }}> 
                      - </button>
                    &nbsp;
                    <button 
                    className='cartUpdateButton cartUpdateDelete'
                    onClick={(event) => {
                                      deleteFromCartinCart(event, item.card_name, item.cartId, givenUserId)
                                      setTimeout(refetch(["Yugioh Cart Data"]),1000)
                                      }}> 
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </li>
                )
            }
            
            });
    }else{
        return console.error(cardList,"cardlist didn't load in cart")
    }
}


  return (
    <div className='shop-list-whole-container'>
      <div id="shop-list-demo">
        Play around with adding, subtracting and deleting items
      </div>
        <div className='shop-list-heading'>
            <h1>Your Shopping List</h1>
            <a href="/" className='shop-list-link-home'>Go Home</a>     
        </div>
        <div id="shop-list-container" >
            <ul>
            {isLoading ? <div>Loading...</div> : error ? <div>Error: {error}</div> : <ListItems />}
            </ul>
        </div>

    </div>
  )
}

export default Shoplist
