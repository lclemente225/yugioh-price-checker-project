import React from 'react';
import {Link} from "react-router-dom";
import './shoplist.css';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Shoplist = ({givenUserId}) => {

const [count, setCount] = React.useState(0);
console.log("this is COUNT",count)

const { isLoading, error, data } = useQuery('Yugioh Data', 
async () =>{
      let response =  await fetch( 'https://shy-rose-apron.cyclic.cloud/cart/list');
      let data = await response.json();   
          return data
          }, []);
          
if(isLoading){
  return <div className='Loading-API-Text'>Loading...</div>
}
async function addToCart(e, name, price, cartId, userId){
      await fetch('https://shy-rose-apron.cyclic.cloud/cart/add', {
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
          setCount(x => x+1)
          return response.json();
        }).catch(error => {
          console.error(error);
        });
   }


async function subtractFromCart(e, cartId, userId) {
    await fetch(`https://shy-rose-apron.cyclic.cloud/cart/updateSubtractItem`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "cartId": cartId, "userId": userId })
              })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to reduce item from cart');
            }else{
                console.log("successfully reduced quantity by 1")
                setCount(x => x-1)
                return response.json();
            }
        }).catch(error => {
          console.error(error);
        });
  }


async function deleteFromCart(e, card_name, cartId, userId) {
  await fetch(`https://shy-rose-apron.cyclic.cloud/cart/deleteItem`, {
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
                    console.log("successfully deleted item")
                    setCount(x => x-1)
                    return response.json();
                }          
        }).catch(error => {
          console.error(error);
        });
  }


function ListItems() {

let cardList = data[0];
let jwtToken = localStorage.getItem("token");
console.log("cardList: ",cardList)
console.log("data: ",data)
    if(cardList != undefined){
        return cardList.map((item) => {
            let shopListItems = {
                "card-name":item.card_name,
                "quantity": item.quantity
            };
            if(jwtToken){
                //console.log("jwt token is present")
            }else{
              console.log("jwt token is absent")
            }
            if(givenUserId === item.userId){
              return (
            <>

                <li key={item.id} className='shop-list-item'>
                <p className="card-listing-text">{item.card_name}</p>    
                <p className="card-listing-text">Quantity: {item.quantity}</p>
                <button 
                    className='cartUpdateButton cartUpdateAdd'
                    onClick={(event) => addToCart(event, item.card_name, item.price, item.cartId, givenUserId)}>+</button>
                    &nbsp;
                    <button 
                    className='cartUpdateButton cartUpdateSubtract'
                    onClick={(event) => subtractFromCart(event, item.cartId, givenUserId)}> - </button>
                    &nbsp;
                    <button 
                    className='cartUpdateButton cartUpdateDelete'
                    onClick={(event) => deleteFromCart(event, item.card_name, item.cartId, givenUserId)}> 
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </li>
            </>         
                )
            }
            
            });
    }else{
        return console.error(cardList,"cardlist didn't load in cart")
    }
}


  return (
    <div className='shop-list-whole-container'>
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
