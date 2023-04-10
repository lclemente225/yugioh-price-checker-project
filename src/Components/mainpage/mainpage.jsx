import NavBar from '../navbar/navbar';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import "./mainpage.css";

export default function MainPage(){
    const [cardData, inputData] = useState({});
    

    const { isLoading, error, data } = useQuery('Yugioh Data', 
    async () =>{
        let response =  await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
        let data = await response.json()   
            return data
            }, []);


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
       // console.log("DESCRIPTION",JSON.stringify(data["data"][0]))
        //console.log("THIS is the INFO",JSON.stringify(data["data"][0]))

  if(isLoading){
    return <div>Loading...</div>
  }
  if(error){
    return <div>error error{error}</div>
  }

  




function testMakeList(){
    const list = [];
    
  let dataArray = data['data'];
    for(let x = 0; x<10; x++){
  let testArray = dataArray[x];
  let cardName = JSON.stringify(testArray['name']).replace(/(\w?\\")/, '"');
  let cardEff = JSON.stringify(testArray['desc']);
  let cardType = JSON.stringify(testArray['type']).replace('"',"");
  let cardTypeofType = JSON.stringify(testArray['race']).replace('"',"");
  let cardPriceArray = testArray['card_prices'][0];
      list.push(
          <div key={x} className="single-card-listing">
            {cardName}
            <p>{cardTypeofType + " " + cardType}</p>
            <p>TCG Player: ${cardPriceArray["tcgplayer_price"]}</p>
            <p>eBay: ${cardPriceArray["ebay_price"]}</p>
            <p>Amazon: ${cardPriceArray["amazon_price"]}</p>
          </div>
        );
          }
          return list
  }
    
    return (
        <div>
            <NavBar />
            <div className="main--page-container">
                <div className="main--page-search">
                    <form className="d-flex" role="search">
                    <input className="search-input form-control me-2" type="search" placeholder="Use the Millenium Eye" aria-label="Search"></input>
                    <button className="main--page-search-btn btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                <div className="card--list-container">
                        {testMakeList()}
                </div>
            </div>
        </div>
    )
}   