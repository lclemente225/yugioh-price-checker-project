import React from 'react';
import './shoplist.css';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

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

const firstAPISite = process.env.API_SITE_2;

const Shoplist = ({givenUserId}) => {


const { isLoading, error, data, refetch } = useQuery('Yugioh Cart Data', 
async () =>{
      let response =  await fetch(`/.netlify/functions/functions/cart/list`);
      let data = await response.json();   
          return data
          },{refetchOnWindowFocus: false},[]);
          
if(isLoading){
  return <div className='Loading-API-Text'>Loading...</div>
}
if(error){
  console.log("SOMETHING WENT WRONG LOADING CART", error)
}


async function addToCartinCart(e, name, price, cartId, userId){
      await fetch(`${firstAPISite}/cart/add`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  "card_name": name, 
                                "price":price, 
                                "quantity":"1",
                                "cartId": cartId,
                                "userId":userId
                                   })
              })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add item to cart');
          }
          //console.log("added 1 successfully")
          //location.reload(); 
          setTimeout(refetch(["Yugioh Cart Data"]),1000)
          return response.json();
        }).catch(error => {
          console.error(error);
        });
   }


async function subtractFromCartinCart(e, cartId, userId) {
    await fetch(`${firstAPISite}/cart/updateSubtractItem`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "cartId": cartId, "userId": userId })
              })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to reduce item from cart');
            }else{
                //console.log("successfully reduced quantity by 1")
                //location.reload();
                setTimeout(refetch(["Yugioh Cart Data"]),1000)
                return response.json();
            }
        }).catch(error => {
          console.error("ERROR IN SUBTRACTING",error);
        });
  }


async function deleteFromCartinCart(e, card_name, cartId, userId) {
  await fetch(`${firstAPISite}/cart/deleteItem`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
                            "card_name": card_name,
                            "cartId": cartId,
                            "userId": userId 
                          })
              })
        .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete item from cart');
                }else{
                    //console.log("successfully deleted item")
                    //location.reload();
                    setTimeout(refetch(["Yugioh Cart Data"]),1000)
                    return response.json();
                }          
        }).catch(error => {
          console.error(error);
        });
  }

  function checkJWT(){
      let jwtToken = localStorage.getItem("token");
      if(jwtToken){
          console.log("jwt token is present")
      }else{
        console.log("jwt token is absent")
      }
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
                                      addToCartinCart(event, item.card_name, item.price, item.cartId, givenUserId) 
                                    }}>
                      +</button>
                    &nbsp;
                    <button 
                    className='cartUpdateButton cartUpdateSubtract'
                    onClick={(event) => { 
                                      subtractFromCartinCart(event, item.cartId, givenUserId) 
                                      }}> 
                      - </button>
                    &nbsp;
                    <button 
                    className='cartUpdateButton cartUpdateDelete'
                    onClick={(event) => {
                                      deleteFromCartinCart(event, item.card_name, item.cartId, givenUserId)
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
