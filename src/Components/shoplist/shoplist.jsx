import React, { useState } from 'react';
import './shoplist.css';
import PriceSelections from './price-selections';
//import Placeholder from './placeholder';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { addToCartinCart, subtractFromCartinCart, deleteFromCartinCart } from '../action-functions/action-functions';
import { HomepageFooter } from '../mainpage/footer';
import useAccessToken from '../../protected-route/authfn';

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

JWT TOKEN can be used to gatekeep this info
server side block the get end point
 */


const Shoplist = () => {

    const [selectedPrice, choosePriceSelection] = useState({
      amazon_price: false, 
      cardmarket_price: false, 
      coolstuffinc_price: false, 
      ebay_price: false,
      tcgplayer_price: false
    })
    const [showPrices, toggleShowPrices] = useState(false);
    const {accessTokenObj} = useAccessToken();
    const givenUserId = accessTokenObj.userID;

  //take this api call and useContext the object keys 
  //utilize  data, isLoading and error in this page
      const { isLoading, error, data, refetch } = useQuery('Yugioh Cart Data', 
            async () =>{
                      let response =  await fetch(`/.netlify/functions/functions/cart/list`);
                      let data = await response.json();   
                      //console.log("trying to load cart", data)
                      return data
                },{
                  refetchOnWindowFocus: false
                },
                []);
            
  if(isLoading){
    return <div className='Loading-API-Text'>Loading...</div>
  }
  if(error){
    console.log("Unable to load cart", error)
    return (
          <div className='Loading-API-Text'>
            <h2> Something went wrong loading cart... </h2>
            <a href="/"><p>Go Home</p></a>
          </div>
          )
  }

  
function ListItems() {
    let cardList = data[0];
    
    if(cardList != undefined){
        return cardList.map((item) => {
          
            let pricesArray = {
                  amazon_price: item.amazon_price, 
                  cardmarket_price: item.cardmarket_price, 
                  coolstuffinc_price: item.coolstuffinc_price, 
                  ebay_price: item.ebay_price,
                  tcgplayer_price: item.tcgplayer_price
                };
            
            if(givenUserId === item.userId){
              return (
                <li key={item.id} className='shop-list-item'>
                <p className="card-listing-text card-listing-name">{item.card_name}</p>    
                <p className="card-listing-text card-listing quantity">Quantity: {item.quantity}</p>
                <div className='card-listing-price-container'>
                  {
                    !selectedPrice.cardmarket_price &&
                    !selectedPrice.coolstuffinc_price &&
                    !selectedPrice.ebay_price &&
                    !selectedPrice.tcgplayer_price &&
                    !selectedPrice.amazon_price &&
                    <p className="card-listing-price">
                      No Price Selected
                    </p>
                  }
                  {
                  selectedPrice.cardmarket_price &&
                  <p className="card-listing-price">
                    CardMarket Price: ${pricesArray["cardmarket_price"]}
                    <a 
                    className='card-listing-link'
                    href={`https://www.cardmarket.com/en/YuGiOh/Products/Search?searchString=${item.card_name}`}
                    target='_blank' 
                    >
                      Look at listings
                    </a>
                  </p>
                  }
                 {
                  selectedPrice.coolstuffinc_price &&
                  <p className="card-listing-price">
                    Coolstuffinc Price: ${pricesArray["coolstuffinc_price"]}
                    <a 
                      className='card-listing-link'
                      target='_blank'
                      href={`https://www.coolstuffinc.com/main_search.php?pa=searchOnName&page=1&resultsPerPage=25&q=${item.card_name}%5C`}
                      >
                      Look at listings
                    </a>
                  </p>
                  }
                  {
                    selectedPrice.ebay_price &&
                  <p className="card-listing-price">
                    Ebay Price: ${pricesArray["ebay_price"]}
                    <a 
                      target='_blank'
                      className='card-listing-link'
                      href={`https://www.ebay.com/sch/i.html?_from=R40&_nkw=${item.card_name}+yugioh&_sacat=0`}
                      >
                      Look at listings
                    </a>
                  </p>
                  }
                  {
                    selectedPrice.amazon_price &&
                  <p className="card-listing-price" >
                    Amazon Price: ${pricesArray["amazon_price"]}
                    <a 
                      target='_blank'
                      className='card-listing-link'
                      href={`https://www.amazon.com/s?k=${item.card_name}+yugioh&ref=nb_sb_noss`}
                      >
                    Look at listings
                  </a>
                  </p>
                  }
                  {
                    selectedPrice.tcgplayer_price &&
                  <p className="card-listing-price">
                    Tcgplayer Price: ${pricesArray["tcgplayer_price"]}
                      <a         
                        target='_blank'
                        className='card-listing-link'          
                        href={`https://www.tcgplayer.com/search/yugioh/product?productLineName=yugioh&q=${item.card_name}+yugioh&view=grid`}
                        >
                        Look at listings
                      </a>
                  </p>
                  }
                </div>
                    <button 
                    className='cartUpdateButton cartUpdateAdd'
                    onClick={(event) => { 
                                      addToCartinCart(event, item.card_name, item.cartId, givenUserId, refetch);
                                      
                                      //location.reload();
                                    }}>
                      +</button>
                    &nbsp;
                    <button 
                    className='cartUpdateButton cartUpdateSubtract'
                    onClick={(event) => { 
                                      subtractFromCartinCart(event, item.cartId, givenUserId, refetch) 
                                      
                                      //location.reload();
                                      }}> 
                      - </button>
                    &nbsp;
                    <button 
                    className='cartUpdateButton cartUpdateDelete'
                    onClick={(event) => {
                                      deleteFromCartinCart(event, item.card_name, item.cartId, givenUserId, refetch)
                                      
                                      //location.reload();
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
        <div className='shop-list-heading'>
            <h1>Your Shopping List</h1>
            <a href="/" className='shop-list-link-home'>Go Home</a>  
        </div>
        <div className='shop-list-wrapper'>
            <div id="shop-list-container">
              <ul>
              {isLoading ?  <div>Loading...</div> : 
              error ? 
              <Placeholder selectedPrice={selectedPrice} choosePriceSelection={choosePriceSelection}/>
              ||
              <div className='Loading-API-Text'>
                <h2> Something went wrong loading cart... </h2>
                <a href="/"><p>Go Home</p></a>
              </div>  : 
              <ListItems />}
              </ul>
            </div>

            <div className='toggle-prices'>
                <span>
                  What prices do you want to check out?
                </span>
                <div className='toggle-arrow' onClick={() =>  toggleShowPrices(x => !x)}>
                  {showPrices ? 'Close Choices' : 'Check out Choices' }
                </div>
                {
                  showPrices &&
                  <PriceSelections selectedPrice={selectedPrice} choosePriceSelection={choosePriceSelection} toggleShowPrices={toggleShowPrices} />
                }
            </div>
        </div>
        <div className="homepage-footer">
       <HomepageFooter/>
       </div>
    </div>
  )
}

export default Shoplist
