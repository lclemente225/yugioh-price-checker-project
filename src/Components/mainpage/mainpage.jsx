import NavBar from '../navbar/navbar';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import "./mainpage.css";
import Pagination from '../pagination/pagination';
import { Link } from "react-router-dom";
import { HomepageFooter } from './footer';
import {SearchResults as SearchResults} from '../searchResults/searchResults';
import {Pagination as SearchPagination} from '../searchpagination/searchPagination';

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
const firstAPISite = import.meta.env.API_SITE_1;

export default function MainPage({LogIn, isLoggedIn, givenUserId}){
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchPage, setSearchCurrentPage] = useState(1);
  const [currentSearchPostsLength, setSearchPostLength] = useState(10);
  const [showSearchResultQuantity, changeSearchResultQuantity] = useState(0);
  const [isCartShowing, showCart] = useState(false);
  const [cardQuantityChangeResult, performingAddingorSubtracting] = useState({
                                                                          action:"",
                                                                          addCardName:"",
                                                                          quantity: 0
                                                                        });
  const [showCardListQuantity, updateCardListQuantity] = useState({
                                                                cardName: "",
                                                                cardId: "",
                                                                cardQuantity: 0
                                                              });
  
 
  //obtain data from yugioh api
  const { isLoading, error, data } = useQuery('Yugioh Data', 
  async () =>{
        let response =  await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
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
    try{
         //console.log(`name, price, id:${index},  event:${e}`)
      const response = await fetch(`${firstAPISite}/cart/add`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  
                                "card_name": name, 
                                "price":price["cardmarket_price"], 
                                "quantity":"1",
                                "cartId": `id${index}`,
                                "userId": userId
                               })
              })
       
          if (!response.ok) {
            throw new Error('Failed to add item to cart');
          }
          showCart(true);

          performingAddingorSubtracting({
              action: "You just added",
              addCardName: name,
              quantity: 1
            })

          
            setTimeout(() => {
              showCart(false)
            }, 1500);
        
      }catch (error) {
          console.error(error);
        }
     
  }
        

/////////////////////////////////////////////////////////////////
   async function subtractFromCart(e, index, userId, name) {
    
    e.preventDefault();
    try{
      const response = await fetch(`${firstAPISite}/cart/updateSubtractItem`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
                          "cartId": `id${index}`,
                          "userId": userId,
                          "card_name": name 
                            })
              })
        
          if (!response.ok) {
            console.log("there's nothing to subtract")
            showCart(true);
            
            performingAddingorSubtracting({
                action: "Your cart has",
                addCardName: name,
                quantity: 0
              })

          setTimeout(() => {
                showCart(false)
              }, 1500);
            throw new Error('Failed to reduce item from cart');
          }else{

            showCart(true);
            
            performingAddingorSubtracting({
                action: "You just subtracted",
                addCardName: name,
                quantity: 1
              })

          setTimeout(() => {
                showCart(false)
              }, 1500);
        
            //console.log("successfully reduced quantity by 1")
          }
          
          
    }catch(error){
      console.error(error)
    }
    
  }
//set up for pagination
    const postsPerPage = 10;

    //Search Page pagination
    
    const searchPostsPerPage = 10;

    
  function filterCard(e){
      //console.log("filtering",e.target.value.toLowerCase())
      setSearchTerm(e.target.value);
  }   
  //add a function that checks for a user id and a jwt authorization
  //if authorized then obtain info from  the table WHERE userid = userid
  //else obtain info from table WHERE userid=007 -> refers to no id and anybody can use it
  //after 15 min then delete the info of cart data WHERE userid = userid
 
  const cardListContainerStyle = {   
                              height: "",
                              background: searchTerm ? "" : 'url("/assets/city-bay-skyline.jpg")'
                                  };
  if(window.innerWidth < 650){
    cardListContainerStyle.height = searchTerm ? '900px' : 'auto'
  }else if(window.innerWidth > 650 && window.innerWidth < 1240){
    cardListContainerStyle.height = searchTerm ? '1000px' : '820px'
  }else if(window.innerWidth > 1240){
    cardListContainerStyle.height = searchTerm ? '800px' : '800px'
  }

    return (
        <div className='page-container'>
          <div style={{
                backgroundColor: "var(--secondary-color)", 
                overflow:'hidden',
                whiteSpace: 'nowrap',
                }}>
              <div style={{
                display: 'inline-block',
                width:'45%',
                margin: 0,
                padding: '5px',
                animation: 'marquee 20s linear infinite',
                }}>
              <span>Sorry, the cart isn't working at the moment. The API is at its limit and I am working on a backup plan.</span>
              </div>
              <div style={{
                display: 'inline-block',
                width: '45%',
                marginLeft: '90%',
                padding: '5px',
                animation: 'marquee 20s linear infinite',
                }}>
              <span>Sorry, the cart isn't working at the moment. The API is at its limit and I am working on a backup plan.</span>
              </div>
          </div>
            <NavBar LogIn={LogIn} isLoggedIn={isLoggedIn}/>
            <div className="main--page-container">
                <div className="main--page-search ">
                    <div className='main--page-search-form'>
                       <input className="search-input form-control me-2" type="search" 
                       onChange={filterCard} 
                       placeholder="Use the Millenium Eye to find cards                            Try(blue-eyes or dark magician...)" 
                       aria-label="Search" />
                    </div>
                    
                  {searchTerm ? 
                  <h4 className='below-search-text'>Your Search resulted in {showSearchResultQuantity} cards</h4>:
                  <h4 className='below-search-text'>We have no pathetic cards</h4> }
                </div>
                <div className="card--list-container" style={cardListContainerStyle}>
                       
                       <SearchResults 
                              searchTerm={searchTerm}
                              currentSearchPage={currentSearchPage} 
                              setSearchPostLength={setSearchPostLength}
                              setSearchCurrentPage={setSearchCurrentPage}
                              searchPostsPerPage={searchPostsPerPage}
                              addToCart={addToCart}
                              subtractFromCart={subtractFromCart}
                              givenUserId={givenUserId}
                              changeSearchResultQuantity={changeSearchResultQuantity}
                              /> 
                </div>
                {
                  searchTerm ?
                  <SearchPagination 
                    currentSearchPostsLength={currentSearchPostsLength}
                    searchPostsPerPage={searchPostsPerPage}   
                    currentSearchPage={currentSearchPage} 
                    setSearchCurrentPage={setSearchCurrentPage}   
                    />
                   : 
                   <Pagination 
                      totalPosts={1}
                      postsPerPage={postsPerPage}
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}                 
                      />}
            </div>
              {isCartShowing && 
              <div className='add-or-sub-popup'>
                {cardQuantityChangeResult.action} {cardQuantityChangeResult.quantity} {cardQuantityChangeResult.addCardName}
            </div>}
            <div id="homepage-footer">
              <HomepageFooter/>
            </div>
        </div>
    )
}   