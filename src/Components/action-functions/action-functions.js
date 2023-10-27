

export async function addToCartinCart(e, name, price, cartId, userId){
    await fetch(`/.netlify/functions/functions/cart/add`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  "card_name": name, 
                              "price":price, 
                              "quantity":"1",
                              "cartId": cartId,
                              "userId":userId
                                 })
            })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add item to cart');
        }
        //console.log("added 1 successfully")
        //location.reload(); 
        return response.json();
      }).catch(error => {
        console.error(error);
      });
 }