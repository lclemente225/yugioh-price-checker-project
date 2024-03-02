import { useState, createContext } from "react";
import { useQuery } from 'react-query';

export const CartContext = createContext(null);

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const {isLoading, error, data } = useQuery('Yugioh Cart Data', 
          async () =>{
                    let response =  await fetch(`/.netlify/functions/functions/cart/list`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    setCart(response.json())
              }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Check if there's an error
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <CartContext.Provider value={cart}>
            {children}
        </CartContext.Provider>
    )
}