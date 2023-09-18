import React from 'react';
import { useQuery } from 'react-query';
import './searchResults.css';

export function SearchResults({
                                searchTerm, 
                                searchPostsPerPage, 
                                setSearchPostLength,  
                                currentSearchPage, 
                                addToCart,
                                subtractFromCart,
                                givenUserId
                              }) {
    
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

const dataArray = data['data'];
const searchedCardIndex = dataArray.map((x) => {
  return dataArray.indexOf(x)
})

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
    for(let x = 0; x<dataArray.length; x++){
            let testArray = dataArray[x];

            //clean JSON data using regex
            let cardName = JSON.stringify(testArray['name']).replace(/(\\)/g, '').replace(/(\")/g,"");
            let cardType = JSON.stringify(testArray['type']).replace(/"/g,"");
            let cardTypeofType = JSON.stringify(testArray['race']).replace(/"/g,"");
            let cardPriceArray = testArray['card_prices'][0];
            

            let object = {
              index: x,
              key:`indexOfCard${x}`,
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
          <h1 className='no-search-results'>
            No search results 
          </h1>
          </>
        )
      }


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
    
    //currentPosts contains cards that are in the slice
    //render the length of currentposts to render only its content
    const currentPosts = filteredArray.slice(searchFirstPostIndex,searchLastPostIndex)
    setSearchPostLength(filteredArray.length)

    
    let renderedSearchResults = [];
    for(let x = 0; x < currentPosts.length; x++){
      renderedSearchResults.push(currentPosts[x]);
    }


    return renderedSearchResults.map((array) => {
    const index = array.index;
    const key = array.key
    const filteredCardName = array.cardName;
    const cardType = array.cardType;
    const cardTypeofType = array.cardTypeofType;
    const cardPriceArray = array.cardPriceArray;
    console.log('index of card in sesarch', index, 'cardName:', filteredCardName)
  
    return (
            <>
            <div key={key} className={ `single-card-listing  active-card` }>
                {filteredCardName}
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
                      onClick={(event) => addToCart(event,filteredCardName, cardPriceArray, index, givenUserId)}>
                        +
                      </button>
  
                      <button  
                        className='cartUpdateButton cartUpdateSubtract'
                        onClick={(event) => subtractFromCart(event, index, givenUserId)}>
                          - 
                      </button>
              </div>
            </>
    )
  })


}


  return (
    <>
      <FilterSearchCards/>
    </>
  )
}

