import React from 'react'


const PriceSelections = ({selectedPrice, choosePriceSelection, toggleShowPrices}) => {

  function selectAmazon(){
    choosePriceSelection({
      amazon_price: true, 
      cardmarket_price: false, 
      coolstuffinc_price: false, 
      ebay_price: false,
      tcgplayer_price: false
    })
  }
  function selectCardMarket(){
    choosePriceSelection({
      amazon_price: false, 
      cardmarket_price: true, 
      coolstuffinc_price: false, 
      ebay_price: false,
      tcgplayer_price: false
    })
  }
  function selectCoolStuff(){
    choosePriceSelection({
      amazon_price: false, 
      cardmarket_price: false, 
      coolstuffinc_price: true, 
      ebay_price: false,
      tcgplayer_price: false
    })
  }
  function selectEbay(){
    choosePriceSelection({
      amazon_price: false, 
      cardmarket_price: false, 
      coolstuffinc_price: false, 
      ebay_price: true,
      tcgplayer_price: false
    })
  }
  function selectTCG(){
    choosePriceSelection({
      amazon_price: false, 
      cardmarket_price: false, 
      coolstuffinc_price: false, 
      ebay_price: false,
      tcgplayer_price: true
    })
  }
  return (
    <div className='price-list-container'>
        <span className='close-price-list' onClick={() => toggleShowPrices(x => !x)}>
          x
        </span>
        Choices
        <p  className={`${ selectedPrice.tcgplayer_price ? 'selected-price' : ''} price-selection`}
        onClick={() => selectTCG()}>
            TCG Player
        </p>
        <p  className={`${selectedPrice.amazon_price ? 'selected-price' : ''} price-selection`}
        onClick={() => selectAmazon()}>
            Amazon
        </p>
        <p  className={`${selectedPrice.ebay_price ? 'selected-price' : ''} price-selection`}
        onClick={() => selectEbay()}>
            Ebay
        </p>
        <p  className={`${selectedPrice.coolstuffinc_price ? 'selected-price' : ''} price-selection`}
        onClick={() => selectCoolStuff()}>
            CoolStuffInc
        </p>
        <p  className={`${selectedPrice.cardmarket_price ? 'selected-price' : ''} price-selection`}
        onClick={() => selectCardMarket()}>
            CardMarket
        </p>
  </div>
  )
}

export default PriceSelections
