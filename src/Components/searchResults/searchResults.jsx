import React from 'react';
import { useQuery } from 'react-query';
import { Link } from "react-router-dom";
import './searchResults.css';

export function SearchResults({searchTerm, searchLastPostIndex, searchCurrentPage, searchFirstPostIndex}) {
    
//maybe make an api call to all the data
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

//filter out data
const dataArray = data['data'];
//maybe have 2 arrays
//1st array has all cards ----> filter out searchword and push to 2nd array
//2nd array has cards that will be rendered


const searchPostsPerPage = 10;
//LASTPOSTINDEX = 1 * 10
const searchLastPostIndex = searchCurrentPage * searchPostsPerPage;
//firstpostindex = 11 - 10
const searchFirstPostIndex = searchLastPostIndex - searchPostsPerPage;
/* c
const currentPosts = filteredArray.slice(firstPostIndex,lastPostIndex)

for(let x = 0; x < 10; x++){
  const renderedSearchResults = currentPosts[x];
  return renderedSearchResults
}
*/


function FilterSearchCards(){
  const list = [];    

  if(dataArray != undefined ){ 
    for(let x = 0; x<dataArray.length; x++){
            let testArray = dataArray[x];
        
            //clean JSON data using regex
            let cardName = JSON.stringify(testArray['name']).replace(/(\\)/g, '').replace(/(\")/g,"");
            let cardType = JSON.stringify(testArray['type']).replace(/"/g,"");
            let cardTypeofType = JSON.stringify(testArray['race']).replace(/"/g,"");
            let cardPriceArray = testArray['card_prices'][0];
            

            let object = {
              cardName: cardName,
              cardType: cardType,
              cardTypeofType: cardTypeofType,
              cardPriceArray: cardPriceArray
            }
            list.push(object)
          }
      }


  //console.log("this is list", list)
  //sift through array of objects 
  //filtered array works 9/17/23
  const filteredArray = list.filter((array) => { 
            const cardName = array.cardName;
            const cardPriceArray = array.cardPriceArray;
            let searchedWord = searchTerm.toLowerCase(); 

            if(cardName.toLowerCase().includes(searchedWord) && searchedWord){
            return array
            }
    })
    
//maybe change to a loop to limit to 10
   filteredArray.map((array) => {
      const index = filteredArray.indexOf(array);
      const cardName = array.cardName;
      const cardType = array.cardType;
      const cardTypeofType = array.cardTypeofType;
      const cardPriceArray = array.cardPriceArray;


      return (
              <div key={`index${index}`} className={ `single-card-listing  active-card` }>
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
      )
    })

    const currentPosts = filteredArray.slice(firstPostIndex,lastPostIndex)

    for(let x = 0; x < 10; x++){
      const renderedSearchResults = currentPosts[x];
      return renderedSearchResults
    }

}

React.useEffect(() => {
  console.log("list of search results",FilterSearchCards())
},[])

//can i make it into an object instead of an array
//props
//1. searchResultsArray aka filteredSearchresults
//2. searchposts per page
//3. search current page
//4. search current page set
  return (
    <>
    <h1>dude</h1>
      <FilterSearchCards/>
    </>
  )
}

