import React from 'react';
import {Link} from "react-router-dom";
import './shoplist.css';
import { useQuery } from 'react-query';


const Shoplist = () => {

const { isLoading, error, data } = useQuery('Yugioh Data', 
async () =>{
      let response =  await fetch( 'http://localhost:3003/cart/list');
      let data = await response.json();   
          return data
          }, []);


async function addToCart(e, name, price, cartId){
      await fetch('http://localhost:3003/cart/add', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  "card_name": name, 
                                "price":price, 
                                "quantity":"1",
                                "cartId": cartId
                                   })
              })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add item to cart');
          }
          return response.json();
        }).catch(error => {
          console.error(error);
        });
   }


   async function subtractFromCart(e, cartId) {
    await fetch(`http://localhost:3003/cart/updateSubtractItem`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "cartId": cartId })
              })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to reduce item from cart');
            }else{
                console.log("successfully reduced quantity by 1")
                return response.json();
            }
        }).catch(error => {
          console.error(error);
        });
  }


  async function deleteFromCart(e, card_name, cartId) {
  await fetch(`http://localhost:3003/cart/deleteItem`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "card_name": card_name,"cartId": cartId })
              })
        .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete item from cart');
                }else{
                    console.log("successfully deleted item")
                    return response.json();
                }          
        }).catch(error => {
          console.error(error);
        });
  }


function ListItems() {

let cardList = data[0];
    if(cardList != undefined){
        return cardList.map((item) => {
            return (
            <>
                <li key={item.id} className='shop-list-item'>
                <p className="card-listing-text">{item.card_name}</p>    
                <p className="card-listing-text">Quantity: {item.quantity}</p>
                <button 
                    className='cartUpdateButton cartUpdateAdd'
                    onClick={(event) => addToCart(event, item.card_name, item.price, item.cartId)}>+</button>
                    &nbsp;
                    <button 
                    className='cartUpdateButton cartUpdateSubtract'
                    onClick={(event) => subtractFromCart(event, item.cartId)}> - </button>
                    &nbsp;
                    <button 
                    className='cartUpdateButton cartUpdateSubtract'
                    onClick={(event) => deleteFromCart(event, item.card_name, item.cartId)}> DEL </button>
                </li>
            </>         
                )
            });
    }else{
        return console.error(cardList,"cardlist didn't load in cart")
    }
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
