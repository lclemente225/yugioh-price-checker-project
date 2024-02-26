import { createContext } from "react";
import { useQuery } from 'react-query';

export const CartContext = createContext(null);

export const CartProvider = ({children}) => {

    const {isLoading, error, data} = useQuery('Yugioh Cart Data', 
          async () =>{
                    let response =  await fetch(`/.netlify/functions/functions/cart/list`);
                    let data = await response.json();   
                    console.log("trying to load cart context", data)
                    return data
              }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Check if there's an error
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <CartContext.Provider value={data}>
            {children}
        </CartContext.Provider>
    )
}