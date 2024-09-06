import { useState,useEffect, createContext } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`/.netlify/functions/functions/cart/list`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch data', response);
            }

            const responseData = await response.json();
            setCart(responseData);
            
        } catch (error) {
            console.error('Error while fetching data:', error);
        }
    };

    //INSTEAD OF POLLING
    //TRY THAT REFETCH APPROACH YOU HAVE
    // look at action-functions.js refetch(["yugioh-cards"])
    useEffect(() => {
        fetchData();
    }, []);
    console.log(cart)
    return (
        <CartContext.Provider value={{cart, fetchData}}>
            {children}
        </CartContext.Provider>
    )
}