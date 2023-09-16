import NavBar from '../navbar/navbar';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import "./mainpage.css";
import Pagination from '../pagination/pagination';
import { Link } from "react-router-dom";
import {SearchResults as SearchResults} from '../searchResults/searchResults';

  /*
        ['id'], ['name'], ['type'],['race'], ['']
         ['card_prices']-> this is an array with 1 obj vv
        {"cardmarket_price":"0.12",
        "tcgplayer_price":"0.21",
        "ebay_price":"0.99",
        "amazon_price":"0.50",
        "coolstuffinc_price":"0.49"}
    
        ['desc'], ['card_sets'], ['set_code'],['set_rarity'],['set_rarity_code'], ['set_price']
        */

export default function MainPage({LogIn, isLoggedIn, givenUserId}){
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchResultsActive, toggleActiveSearchResults] = useState(false);
 
 
  //obtain data from yugioh api
  const { isLoading, error, data } = useQuery('Yugioh Data', 
  async () =>{
        let response =  await fetch( 'https://db.ygoprodeck.com/api/v7/cardinfo.php');
        let data = await response.json();   
            return data
            }, []);

  if(isLoading){
    return <div className='Loading-API-Text'>Loading...</div>
  };
  if(error){
    return <div>error error{error}</div>
  }; 

  ///////////////////////////////////////////////////////////////
  async function addToCart(e, name, price, index, userId){
    e.preventDefault();
      console.log(`name, price, id:${index},  event:${e}`)
      await fetch('https://shy-rose-apron.cyclic.cloud/cart/add', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  "card_name": name, 
                                "price":price["cardmarket_price"], 
                                "quantity":"1",
                                "cartId": `id${index}`,
                                "userId": userId
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

/////////////////////////////////////////////////////////////////
   async function subtractFromCart(e, index, userId) {
    e.preventDefault();
    
    await fetch(`https://shy-rose-apron.cyclic.cloud/cart/updateSubtractItem`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
                          "cartId": `id${index}`,
                          "userId": userId 
                            })
              })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to reduce item from cart');
          }else{
            console.log("successfully reduced quantity by 1")
          }
          return response.json();
        }).catch(error => {
          console.error(error);
        });
  }
///////////////////////////////////////////////////////////////////////////

    const dataArray = data['data'];

//set up for pagination
    const postsPerPage = 10;
    //LASTPOSTINDEX = 1 * 10
    const lastPostIndex = currentPage * postsPerPage;
    //firstpostindex = 11 - 10
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = dataArray.slice(firstPostIndex,lastPostIndex)

//start organizing JSON data
//clean JSON data
    function MakeList(){
        const list = [];    

      if(dataArray != undefined ){ 
        for(let x = 0; x<10; x++){
          let testArray = currentPosts[x];

          //clean JSON data using regex
          let cardName = JSON.stringify(testArray['name']).replace(/(\\)/g, '').replace(/(\")/g,"");
          let cardEff = JSON.stringify(testArray['desc']);
          let cardType = JSON.stringify(testArray['type']).replace(/"/g,"");
          let cardTypeofType = JSON.stringify(testArray['race']).replace(/"/g,"");
          let cardPriceArray = testArray['card_prices'][0];
          
          //each array contains html code for one card
          list.push(
              <div key={x} className={ `single-card-listing  active-card` }>
                      {cardName}
                  <p className='mainpage-card-list-text'>
                      {cardTypeofType + " " + cardType}
                  </p>

                  <p className='mainpage-card-list-text'>
                      TCG Player: {cardPriceArray["tcgplayer_price"] == 0.00 ? " Not Listed":`$${cardPriceArray["tcgplayer_price"]}`}
                  </p>

                  <p className='mainpage-card-list-text'>
                      eBay: {cardPriceArray["ebay_price"]  == 0.00 ? " Not Listed":`$${cardPriceArray["ebay_price"]}`}
                  </p>

                  <p className='mainpage-card-list-text'>
                      Amazon: {cardPriceArray["amazon_price"] == 0.00 ? " Not Listed":`$${cardPriceArray["amazon_price"]}`}
                  </p>

                  <button 
                  className='cartUpdateButton cartUpdateAdd'
                  onClick={(event) => addToCart(event,cardName, cardPriceArray, x, givenUserId)}>
                    +
                  </button>

                  <button  
                    className='cartUpdateButton cartUpdateSubtract'
                    onClick={(event) => subtractFromCart(event, x, givenUserId)}>
                      - 
                  </button>
              </div>
            );
              }
              return list
          }else{
            console.error(dataArray, "error in mainpage")
          }
  }
    
/*
Search issue is that 
--I cannot search through the whole json 

make a function that will 
1. take all card info from api
2. filter out all the info
3. push all the info into the list
4. render the list

KEEP IN MIND
1. ensure that rendered data is going to work with pagination


function searchResults(){
    const list = [];    

      if(dataArray != undefined ){ 
        for(let x = 0; x<10; x++){
          
          **change testArray from (currentPosts) dataArray.slice(firstPostIndex,lastPostIndex) 
            to dataArray

          let testArray = currentPosts[x];
          let cardName = JSON.stringify(testArray['name']).replace(/(\\)/g, '').replace(/(\")/g,"");
          let cardEff = JSON.stringify(testArray['desc']);
          let cardType = JSON.stringify(testArray['type']).replace(/"/g,"");
          let cardTypeofType = JSON.stringify(testArray['race']).replace(/"/g,"");
          let cardPriceArray = testArray['card_prices'][0];
          
          list.push(
              <div key={x} className={ `single-card-listing  active-card` }>
                      {cardName}
                  <p className='mainpage-card-list-text'>
                      {cardTypeofType + " " + cardType}
                  </p>

                  <p className='mainpage-card-list-text'>
                      TCG Player: {cardPriceArray["tcgplayer_price"] == 0.00 ? " Not Listed":`$${cardPriceArray["tcgplayer_price"]}`}
                  </p>

                  <p className='mainpage-card-list-text'>
                      eBay: ${cardPriceArray["ebay_price"]}
                  </p>

                  <p className='mainpage-card-list-text'>
                      Amazon: ${cardPriceArray["amazon_price"]}
                  </p>

                  <button 
                  className='cartUpdateButton cartUpdateAdd'
                  onClick={(event) => addToCart(event,cardName, cardPriceArray, x, givenUserId)}>
                    +
                  </button>

                  <button  
                    className='cartUpdateButton cartUpdateSubtract'
                    onClick={(event) => subtractFromCart(event, x, givenUserId)}>
                      - 
                  </button>
              </div>
            );
              }
            return list.filter((card) => { 
                const cardName = card.props.children[0];
                let searchedWord = searchTerm.toLowerCase();

                return cardName.toLowerCase().includes(searchedWord)
                
              })
            }else{
              console.log("error in loading search")
            }   
}
*/

 function searchToggle(){  
  console.log("Is search results active??",isSearchResultsActive)  
 toggleActiveSearchResults(x => !x)
 }
  function filterCard(e){
      console.log("filtering",e.target.value.toLowerCase())
      setSearchTerm(e.target.value);
  }   

  //add a function that grabs from my mysql database
 //AKA API CALL

  //add a function that checks for a user id and a jwt authorization
  //if authorized then obtain info from  the table WHERE userid = userid
  //else obtain info from table WHERE userid=007 -> refers to no id and anybody can use it
  //after 15 min then delete the info of cart data WHERE userid = userid
  

    return (
        <div>
            <NavBar LogIn={LogIn} isLoggedIn={isLoggedIn}/>
            <div className="main--page-container">
                <div className="main--page-search ">
                    <div className='main--page-search-form'>
                       <input className="search-input form-control me-2" type="search" 
                       onChange={filterCard} placeholder="Use the Millenium Eye to find cards" 
                       aria-label="Search" />

                      <button onClick={searchToggle} className="main--page-search-btn" type="submit">
                          <img src="src\assets\images\millenium-eye.png" alt="millenium eye" 
                          className='millenium-eye-image'/> 
                      </button>
                    </div>
                </div>
                <div className="card--list-container">
                       {
                       isSearchResultsActive ? 
                       <SearchResults searchTerm={searchTerm}/> : 
                       <MakeList />
                       }
                </div>
                <Pagination 
                      totalPosts={dataArray.length}
                      postsPerPage={postsPerPage}
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}                      
                      />
            </div>
        </div>
    )
}   