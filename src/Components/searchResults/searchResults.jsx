import React from 'react';
import { useQuery } from 'react-query';
import { Link } from "react-router-dom";

export function SearchResults({searchTerm}) {
    
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


const list = [];    

if(dataArray != undefined ){ 
  for(let x = 0; x<10; x++){
    let testArray = dataArray[x];

    //clean JSON data using regex
    let cardName = JSON.stringify(testArray['name']).replace(/(\\)/g, '').replace(/(\")/g,"");
    let cardType = JSON.stringify(testArray['type']).replace(/"/g,"");
    let cardTypeofType = JSON.stringify(testArray['race']).replace(/"/g,"");
    let cardPriceArray = testArray['card_prices'][0];
    
    //each array contains html code for one card
    list.push({
      cardName: cardName,
      cardType: cardType,
      cardTypeofType: cardTypeofType,
      cardPriceArray: cardPriceArray
    })
        }
    }else{
      console.error(dataArray, "error in search")
    }


function filterSearchCards(array){
  array.filter((list) => { 
    const cardName = list.cardName;
    let searchedWord = searchTerm.toLowerCase();

    return cardName.toLowerCase().includes(searchedWord)
    
  })
}

console.log(filterSearchCards(list))
function RenderSearchCards(){
filterSearchCards(list).map((x) => {
  let index = list.indexOf(x)
      return(
             <div key={index} className={ `single-card-listing  active-card` }>
                      {cardName}
                  <p className='mainpage-card-list-text'>
                      {cardTypeofType + " " + cardType}
                  </p>

                  <p className='mainpage-card-list-text'>
                      TCG Player: {cardPriceArray["tcgplayer_price"] == 0.00 ? 
                      " Not Listed":
                      `$${cardPriceArray["tcgplayer_price"]}`}
                  </p>

                  <p className='mainpage-card-list-text'>
                      eBay: ${cardPriceArray["ebay_price"]}
                  </p>

                  <p className='mainpage-card-list-text'>
                      Amazon: ${cardPriceArray["amazon_price"]}
                  </p>

                  <button 
                  className='cartUpdateButton cartUpdateAdd'
                  onClick={(event) => addToCart(event, cardName,array. cardPriceArray, index, givenUserId)}>
                    +
                  </button>

                  <button  
                    className='cartUpdateButton cartUpdateSubtract'
                    onClick={(event) => subtractFromCart(event, index, givenUserId)}>
                      - 
                  </button>
              </div>
              )
})
}
//can i make it into an object instead of an array

  return (
    <>
      hello
    </>
  )
}

