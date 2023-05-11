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
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(false);

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

  
   //maybe put into app.js file?
   async function deleteFromCart(e, index) {
    //DELETE REQ??
    //PUT REQ??
    e.preventDefault();
    
    //1. to delete i need to fetch info from database
    //2. place the info into a state which will be an array of objects
    //3. put the info into 

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

 function testMakeList(){
    const list = [];    
    let dataArray = data['data'];
    
  if(dataArray != undefined){  for(let x = 0; x<60; x++){
      let testArray = dataArray[x];
      let cardName = JSON.stringify(testArray['name']).replace(/(\\)/g, '').replace(/(\")/g,"");
      let cardEff = JSON.stringify(testArray['desc']);
      let cardType = JSON.stringify(testArray['type']).replace(/"/g,"");
      let cardTypeofType = JSON.stringify(testArray['race']).replace(/"/g,"");
      let cardPriceArray = testArray['card_prices'][0];

      list.push(
          <div key={x} 
          className={
            `single-card-listing 
          ${active ? 'active-card' : 'inactive-card'}`
          }>
            {cardName}
            <p>{cardTypeofType + " " + cardType}</p>
            <p>TCG Player: {cardPriceArray["tcgplayer_price"] == 0.00 ? " Not Listed":`$${cardPriceArray["tcgplayer_price"]}`}</p>
            <p>eBay: ${cardPriceArray["ebay_price"]}</p>
            <p>Amazon: ${cardPriceArray["amazon_price"]}</p>
            <button 
            className='cartUpdateButton cartUpdateAdd'
            onClick={(event) => addToCart(event, cardName, cardPriceArray, x)}>+</button>
            &nbsp;
            <button 
            className='cartUpdateButton cartUpdateSubtract'
            onClick={(event) => deleteFromCart(event, x)}> - </button>
          </div>
        );
          }
  
          return list.filter((card) => {
            const cardName = card.props.children[0];
            return cardName.toLowerCase().includes(searchTerm.toLowerCase());
        });
      }else{
        console.error(dataArray, "error in mainpage")
      }
  }
    

  function filterCard(e){
      console.log("filtering",e.target.value.toLowerCase())
      setSearchTerm(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    setActive(!active);
  }
//button or function to add to list
  
    return (
        <div>
            <NavBar />
            <div className="main--page-container">
                <div className="main--page-search">
                    <form className="d-flex" role="search">
                       <input className="search-input form-control me-2" type="search" onChange={filterCard} placeholder="Use the Millenium Eye" aria-label="Search" />
                       <button onClick={handleClick} className="main--page-search-btn btn btn-outline-success" type="submit">
                        {active ? "Hide Results" : "Search" }
                        </button>
                    </form>
                </div>
                <div className="card--list-container">
                        {testMakeList()}
                </div>
            </div>
        </div>
    )
}   