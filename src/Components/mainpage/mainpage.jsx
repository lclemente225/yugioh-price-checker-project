import NavBar from '../navbar/navbar';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import "./mainpage.css";
import Pagination from '../pagination/pagination';
import { Link } from "react-router-dom";

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

export default function MainPage({searchInfo, setSearchInfo}){
  const [searchTerm, setSearchTerm] = useState("");
  //const [active, setActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchResultsActive, toggleActiveSearchResults] = useState(false);

 
   const { isLoading, error, data } = useQuery('Yugioh Data', 
  async () =>{
        let response =  await fetch( 'https://db.ygoprodeck.com/api/v7/cardinfo.php');
        let data = await response.json();   
            return data
            }, []);

  if(isLoading){
    return <div>Loading...</div>
  };
  if(error){
    return <div>error error{error}</div>
  }; 
 
//maybe put it into the app.js file?
  async function addToCart(e, name, price, index){
    //POST REQ??
    e.preventDefault();
      console.log(name, price, `id${index}`)
      await fetch('http://localhost:3003/cart/add', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  "card_name": name, 
                                "price":price["cardmarket_price"], 
                                "quantity":"1",
                                "cartId": `id${index}`
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

   async function subtractFromCart(e, index) {
    e.preventDefault();
    
    await fetch(`http://localhost:3003/cart/updateSubtractItem`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "cartId": `id${index}` })
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

 const dataArray = data['data'];
  
const postsPerPage = 10;
const lastPostIndex = currentPage * postsPerPage;
const firstPostIndex = lastPostIndex - postsPerPage;
const currentPosts = dataArray.slice(firstPostIndex,lastPostIndex)

 function testMakeList(){
    const list = [];    

  if(dataArray != undefined){ 
     for(let x = 0; x<10; x++){
      let testArray = currentPosts[x];
      let cardName = JSON.stringify(testArray['name']).replace(/(\\)/g, '').replace(/(\")/g,"");
      let cardEff = JSON.stringify(testArray['desc']);
      let cardType = JSON.stringify(testArray['type']).replace(/"/g,"");
      let cardTypeofType = JSON.stringify(testArray['race']).replace(/"/g,"");
      let cardPriceArray = testArray['card_prices'][0];
      
      list.push(
          <div key={x} className={ `single-card-listing  active-card' ` }>
            {cardName}
            <p className='mainpage-card-list-text'>{cardTypeofType + " " + cardType}</p>
            <p className='mainpage-card-list-text'>TCG Player: {cardPriceArray["tcgplayer_price"] == 0.00 ? " Not Listed":`$${cardPriceArray["tcgplayer_price"]}`}</p>
            <p className='mainpage-card-list-text'>eBay: ${cardPriceArray["ebay_price"]}</p>
            <p className='mainpage-card-list-text'>Amazon: ${cardPriceArray["amazon_price"]}</p>
            <button 
            className='cartUpdateButton cartUpdateAdd'
            onClick={(event) => addToCart(event,cardName, cardPriceArray, x)}>+</button>
            &nbsp;
            <button  
            className='cartUpdateButton cartUpdateSubtract'
            onClick={(event) => subtractFromCart(event, x)}> - </button>
          </div>
        );
          }
  
          return list        
        
      }else{
        console.error(dataArray, "error in mainpage")
      }
  }
    
  function searchResults(e){
    //when clicking search button
    //1. redirect to search results page
    //2. set info as state to send as props
    //3. send info to the results page as props
    e.preventDefault();

    const searchResultsArray = [];    

  if(dataArray != undefined){ 
     for(let x = 0; x<100; x++){
      let testArray = dataArray[x];
      let cardName = JSON.stringify(testArray['name']).replace(/(\\)/g, '').replace(/(\")/g,"");
      let cardEff = JSON.stringify(testArray['desc']);
      let cardType = JSON.stringify(testArray['type']).replace(/"/g,"");
      let cardTypeofType = JSON.stringify(testArray['race']).replace(/"/g,"");
      let cardPriceArray = testArray['card_prices'][0];
          
          searchResultsArray.push({
            cardName: cardName,
            cardEffect: cardEff,
            cardType: cardType,
            specificType: cardTypeofType,
            prices: cardPriceArray
              })
          }
  
          return searchResultsArray.filter((card) => {            
            const cardName = card.cardName;
            let info = cardName.toLowerCase().includes(searchTerm.toLowerCase())             
            if(info){
              //toggleActiveSearchResults(true);
              return setSearchInfo((searchData) => {
                                      return {...searchData, searchResultsArray}
                                      });
               }
          })     
        
      }else{
        console.error(dataArray, "error in mainpage")
      }      
  }

 
  function filterCard(e){
      console.log("filtering",e.target.value.toLowerCase())
      setSearchTerm(e.target.value);
  } 


  function handleAuthentication(){
    const jwtAuth = fetch("http://localhost:3003/checkAuth", {
      method: GET, headers:{"access-token": localStorage.getItem("token")}
    })

    jwtAuth.then(res => console.log(res))
    .catch(err => console.log("unable to retrieve jwt", err))
  }


    return (
        <div>
            <NavBar />
            
            <div className="main--page-container"><hr/>
                <div className="main--page-search">
                    <form className="d-flex main--page-search-form" role="search">
                       <input className="search-input form-control me-2" type="search" onChange={filterCard} placeholder="Use the Millenium Eye" aria-label="Search" />
                      <button onClick={searchResults} className="main--page-search-btn btn btn-outline-success" type="submit">
                          <strong> Search</strong>
                        </button>
                    </form>
                </div><hr/>
                <div className="card--list-container">
                        {testMakeList()}
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