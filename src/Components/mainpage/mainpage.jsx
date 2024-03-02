import NavBar from '../navbar/navbar';
import { useState, useEffect, useContext } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import "./mainpage.css";
import Pagination from '../pagination/pagination';
import { HomepageFooter } from './footer';
import {SearchResults as SearchResults} from '../searchResults/searchResults';
import {Pagination as SearchPagination} from '../searchpagination/searchPagination';
import { CartContext } from '../cart-context/CartContext';

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
       //let cartData = CartContext()

export default function MainPage({LogIn, isLoggedIn, givenUserId}){
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchPage, setSearchCurrentPage] = useState(1);
  const [currentSearchPostsLength, setSearchPostLength] = useState(10);
  const [showSearchResultQuantity, changeSearchResultQuantity] = useState(0);

  const cardDataTest = useContext(CartContext)
  console.log("mainpage.jsx test cart context: ",cardDataTest)

  //obtain data from yugioh api
  const { isLoading, error, data } = useQuery('Yugioh Data', 
  async () =>{
        let response =  await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
        let data = await response.json();   
            return data
            },{
              refetchOnWindowFocus: false,
            },
             []);

  if(isLoading){
    return <div className='Loading-API-Text'>Loading...</div>
  };
  if(error){
    return <div>error error{error}</div>
  }; 

  
  function notification(action, name, quantity){
    const notifInfo = { action, name,  quantity }

    toast.success(`${notifInfo.action} ${notifInfo.quantity} ${notifInfo.name}`)
  }

  async function addToCart(e, name, price, index, userId){
    e.preventDefault();
    try{
      
        const response = await fetch(`/.netlify/functions/functions/cart/add`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  
                                    "card_name": name, 
                                    "cardmarket_price":price["cardmarket_price"], 
                                    "tcgplayer_price": price["tcgplayer_price"],
                                    "amazon_price": price["amazon_price"], 
                                    "coolstuffinc_price": price["coolstuffinc_price"], 
                                    "ebay_price": price["ebay_price"],
                                    "quantity":"1",
                                    "cartId": `id${index}`,
                                    "userId": userId
                                  })
        })

       
          if (!response.ok) {
            toast.error('Failed to add item to cart')
            throw new Error('Failed to add item to cart');
          } else {   
            notification('You have added', name, 1)
          }
          
      }catch (error) {
          console.error(error);
        }
     
  }
        

   async function subtractFromCart(e, index, userId, name) {
    //console.log("name",  name)
    e.preventDefault();
    try{
      const response = await fetch(`/.netlify/functions/functions/cart/updateSubtractItem`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
                          "cartId": `id${index}`,
                          "userId": userId,
                          "card_name": name 
                            })
              })
        
          if (!response.ok) {
            notification('Unable to subtract: You have', name, 0)
            throw new Error('Failed to reduce item from cart');
          }else{
            notification('You successfully subtracted', name, 1)
              
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
            <NavBar LogIn={LogIn} isLoggedIn={isLoggedIn}/>
            <div className="main--page-container">
                <div className="main--page-search ">
                    <div className='main--page-search-form reading-font'>
                      <label className='reading-font'>Try(blue-eyes or dark magician...)</label>
                       <input className="search-input form-control me-2" type="search" 
                       onChange={filterCard} 
                       placeholder="Use the Millenium Eye to find cards" 
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
              {
                /* isCartShowing && 
                <div className='add-or-sub-popup'>
                    {cardQuantityChangeResult.action} {cardQuantityChangeResult.quantity} {cardQuantityChangeResult.addCardName}
                </div> */
              }
            <div id="homepage-footer">
              <HomepageFooter/>
            </div>
        </div>
    )
}   