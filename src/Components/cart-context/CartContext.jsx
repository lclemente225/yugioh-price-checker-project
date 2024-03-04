import { useState,useEffect, createContext } from "react";
import { useQuery } from 'react-query';

export const CartContext = createContext(null);

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [lastModified, setLastModified] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`/.netlify/functions/functions/cart/list`, {
                headers: lastModified ? { 'If-Modified-Since': lastModified } : {}
            });

            console.log("response in general cartcontext.jsx", response, "state of lastmodified", lastModified)
            if (response.status === 304) {
                // Resource not modified, no need to update
                console.log("no updates, cartcontext.jsx")
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const responseData = await response.json();
            setCart(responseData);
            
            // Update lastModified timestamp
            const lastModifiedHeader = response.headers.get('Last-Modified');
            if (lastModifiedHeader) {
                setLastModified(lastModifiedHeader);
            }
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

    // Polling interval in milliseconds (e.g., every 5 seconds)
    const pollingInterval = 5000;

    useEffect(() => {
        const pollingTimer = setInterval(fetchData, pollingInterval);

        return () => clearInterval(pollingTimer);
    }, []);

    return (
        <CartContext.Provider value={cart}>
            {children}
        </CartContext.Provider>
    )
}