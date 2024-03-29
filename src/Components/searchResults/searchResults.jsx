import React, { useState, useContext } from 'react';
import { CartContext } from '../cart-context/CartContext';
import { useQuery } from 'react-query';
import './searchResults.css';

export function SearchResults({
                                searchTerm, 
                                searchPostsPerPage, 
                                setSearchPostLength,  
                                currentSearchPage, 
                                addToCart,
                                subtractFromCart,
                                givenUserId,
                                changeSearchResultQuantity
                              }) {
  const {cart, fetchData} = useContext(CartContext);
  const userId = localStorage.getItem("Login UserId");

 
  const { isLoading, error, data } = useQuery('Yugioh Data', 
  async () =>{
        let response =  await fetch( 'https://db.ygoprodeck.com/api/v7/cardinfo.php');
        let data = await response.json();   
            return data
            }, []);

  if(isLoading){
    return <h1 className='Loading-API-search-Text'>Loading...</h1>
  };
  if(error){
    return <div>error error{error}</div>
  }; 

const dataArray = data['data'];

//LASTPOSTINDEX = 1 * 10
const searchLastPostIndex = currentSearchPage * searchPostsPerPage;
//firstpostindex = 11 - 10
const searchFirstPostIndex = searchLastPostIndex - searchPostsPerPage;

/*
How does FilterSearchCards work?
1. list array will obtain data from the base data array and 
---------> make it an object for easy referencing
2. filteredArray will look through the list array for the searched word 
---------> result is a smaller array of objects
3. currentPosts is a sliced array of filteredArray
** The slices are determined by the page number

-First post index and Last post index are influenced by currentSearchPage
which can be any number from 0 - 12500

4. Add the sliced FilteredArray (aka currentPosts) to another array(renderedArray)
5. map through the renderedArray and VOILA the results are there!
    
*/
function FilterSearchCards(){
  const list = [];    

  if(dataArray != undefined && searchTerm != "" ){ 
    for(let x = 0; x < dataArray.length; x++){
            let testArray = dataArray[x];

            //clean JSON data using regex
            let cardName = JSON.stringify(testArray['name']).replace(/(\\)/g, '').replace(/(\")/g,"");
            let cardType = JSON.stringify(testArray['type']).replace(/"/g,"");
            let cardTypeofType = JSON.stringify(testArray['race']).replace(/"/g,"");
            let cardPriceArray = testArray['card_prices'][0];
            

            let object = {
              index: x,
              key:`cardId${x}`,
              cardName: cardName,
              cardType: cardType,
              cardTypeofType: cardTypeofType,
              cardPriceArray: cardPriceArray
            }
            list.push(object)
          }
      }else{
        
        return (
          <> 
            <img src="./assets/pegasus-image-portrait-removebg.png" alt="millenium eye" 
                  className='millenium-eye-image'/> 
            <div className='no-search-results'>
                  <h2>[Pegasus]</h2>
                  <h2 key="NoFindText" className="no-find-text flex-center">
                    Type in the search box to see my wares...
                  </h2>
            </div>
          </>
        )
      }


  //sift through array of objects 
  //filtered array works 9/17/23
  const filteredArray = list.filter((array) => { 
            const cardName = array.cardName.replace(/[^a-zA-Z ]/g, ' ').replace(/\s+/g, "\\s*");
            const cardPriceArray = array.cardPriceArray;
            let searchedWord = searchTerm.toLowerCase().replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, "\\s*"); 

            if(cardName.toLowerCase().includes(searchedWord) && searchedWord){
            return array
            }
    })
    
    //currentPosts contains cards that are in the slice
    //render the length of currentposts to render only its content
    const currentPosts = filteredArray.slice(searchFirstPostIndex,searchLastPostIndex)

    function changeSearchNumber(){
      setSearchPostLength(() => filteredArray.length)
      changeSearchResultQuantity(() => filteredArray.length)
    }
    setTimeout(changeSearchNumber, 800)

    let renderedSearchResults = [];
    for(let x = 0; x < currentPosts.length; x++){
      renderedSearchResults.push(currentPosts[x]);
    }


    return renderedSearchResults.map((array) => {
    const index = array.index;
    const key = array.key;
    const filteredCardName = array.cardName;
    const cardType = array.cardType;
    const cardTypeofType = array.cardTypeofType;
    const cardPriceArray = array.cardPriceArray;
    

    return (
            
            <div key={key} id={key} className={ `single-card-listing` }>
                      <p className='list-card-name reading-font'>{filteredCardName}</p>
                      <p className='mainpage-card-list-text typeoftypetext reading-font'>
                          {cardTypeofType + " " + cardType}
                      </p>
  
                      <a className='mainpage-card-list-text reading-font' 
                      target="_blank"
                      href={`https://www.tcgplayer.com/search/yugioh/product?productLineName=yugioh&q=${filteredCardName}+yugioh&view=grid`}>
                          TCG Player: {cardPriceArray["tcgplayer_price"] == 0.00 ? 
                          "Check Site"
                          :
                          `$${cardPriceArray["tcgplayer_price"]}`}
                        </a>
  
                      <a className='mainpage-card-list-text reading-font'
                      target="_blank"
                      href={`https://www.ebay.com/sch/i.html?_from=R40&_nkw=${filteredCardName}+yugioh&_sacat=0`}>
                          eBay: {cardPriceArray["ebay_price"] == 0.00 ? 
                          "Check Site"
                          :
                          `$${cardPriceArray["ebay_price"]}`}
                      </a>
  
                      <a className='mainpage-card-list-text reading-font'
                      target="_blank"
                      href={`https://www.amazon.com/s?k=${filteredCardName}+yugioh&ref=nb_sb_noss`}>
                          Amazon: {cardPriceArray["amazon_price"] == 0.00 ? 
                          "Check Site"
                          :
                          `$${cardPriceArray["amazon_price"]}`}
                      </a>

                      <div className='mutate-button-container'>
                        { 
                              cart[0].map((value) => {
                              if(value.card_name === filteredCardName && value.userId === userId){
                                  return (
                                    <p className='red-text reading-font'>
                                    {value.quantity} in cart
                                  </p>
                                  )
                                }
                                return null
                            }) 
                          }
                        <button 
                        className='cardUpdateButton cardUpdateAdd'
                        onClick={async (event) => {
                          await addToCart(event, filteredCardName, cardPriceArray, index, givenUserId)
                          setTimeout(fetchData, 500)
                          }}>
                          +
                        </button>
    
                        <button  
                          className='cardUpdateButton cardUpdateSubtract'
                          onClick={async (event) => {
                            await subtractFromCart(event, index, givenUserId, filteredCardName)
                            setTimeout(fetchData, 500)
                            }}>
                            - 
                        </button>
                        </div>
              </div>
    )
  })
}


  return (
    <>
      <FilterSearchCards/>
    </>
  )
}

