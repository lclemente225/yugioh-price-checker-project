

export async function addToCartinCart(e, name, cartId, userId, refetch){
    await fetch(`/.netlify/functions/functions/cart/add`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  "card_name": name, 
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
        setTimeout(refetch(["Yugioh Cart Data"]),1000)
        return response.json();
      }).catch(error => {
        console.error(error);
      });
 }

 
export async function subtractFromCartinCart(e, cartId, userId, refetch) {
    await fetch(`/.netlify/functions/functions/cart/updateSubtractItem`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "cartId": cartId, "userId": userId })
              })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to reduce item from cart');
            }else{
                //console.log("successfully reduced quantity by 1")
                //location.reload();
                setTimeout(refetch(["Yugioh Cart Data"]),1000)
                return response.json();
            }
        }).catch(error => {
          console.error("ERROR IN SUBTRACTING",error);
        });
  }

  
  export async function deleteFromCartinCart(e, card_name, cartId, userId, refetch) {
    await fetch(`/.netlify/functions/functions/cart/deleteItem`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
                              "card_name": card_name,
                              "cartId": cartId,
                              "userId": userId 
                            })
                })
          .then(response => {
                  if (!response.ok) {
                      throw new Error('Failed to delete item from cart');
                  }else{
                      //console.log("successfully deleted item")
                      //location.reload();
                      setTimeout(refetch(["Yugioh Cart Data"]),1000)
                      return response.json();
                  }          
          }).catch(error => {
            console.error(error);
          });
    }
  