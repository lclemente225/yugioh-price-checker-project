import NavBar from '../navbar/navbar';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import "./mainpage.css";

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

export default function MainPage(){
    const [cardData, inputData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [active, setActive] = useState(false);

    const { isLoading, error, data } = useQuery('Yugioh Data', 
    async () =>{
        let response =  await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
        let data = await response.json()   
            return data
            }, []);


  

  if(isLoading){
    return <div>Loading...</div>
  }
  if(error){
    return <div>error error{error}</div>
  }

function testMakeList(){
    const list = [];
    
  let dataArray = data['data'];
    for(let x = 0; x<60; x++){
  let testArray = dataArray[x];
  let cardName = JSON.stringify(testArray['name']).replace(/(\\)/g, '').replace(/(\")/g,"");
  let cardEff = JSON.stringify(testArray['desc']);
  let cardType = JSON.stringify(testArray['type']).replace(/"/g,"");
  let cardTypeofType = JSON.stringify(testArray['race']).replace(/"/g,"");
  let cardPriceArray = testArray['card_prices'][0];
      list.push(
          <div key={x} className={`single-card-listing ${active ? 'active-card' : 'inactive-card'}`}>
            {cardName}
            <p>{cardTypeofType + " " + cardType}</p>
            <p>TCG Player: ${cardPriceArray["tcgplayer_price"]}</p>
            <p>eBay: ${cardPriceArray["ebay_price"]}</p>
            <p>Amazon: ${cardPriceArray["amazon_price"]}</p>
          </div>
        );
          }
          return list.filter((card) => {
            const cardName = card.props.children[0];
            return cardName.toLowerCase().includes(searchTerm.toLowerCase());
        });
  }
    

  function filterCard(e){
      console.log("filtering",e.target.value.toLowerCase())
      setSearchTerm(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    setActive(!active);
  }
    return (
        <div>
            <NavBar />
            <div className="main--page-container">
                <div className="main--page-search">
                    <form className="d-flex" role="search">
                       <input className="search-input form-control me-2" type="search" onChange={filterCard} placeholder="Use the Millenium Eye" aria-label="Search"></input>
                       <button onClick={handleClick} className="main--page-search-btn btn btn-outline-success" type="submit">{active ? "Hide Results" : "Search" }</button>
                    </form>
                </div>
                <div className="card--list-container">
                        {testMakeList()}
                </div>
            </div>
        </div>
    )
}   