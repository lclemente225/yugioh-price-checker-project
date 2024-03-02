import { useState,useEffect, createContext } from "react";
import { useQuery } from 'react-query';

export const CartContext = createContext(null);

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

  /*   const {isLoading, error, isSuccess, data } = useQuery('Yugioh Cart Data', 
          async () =>{
                    let response =  await fetch(`/.netlify/functions/functions/cart/list`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return response.json()
              }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Check if there's an errord
        return <div>Error: {error.message}</div>;
    }

    if(isSuccess) setCart(data) */
    //////////////////////////////////////////////////

    const [lastModified, setLastModified] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`/.netlify/functions/functions/cart/list`, {
                headers: lastModified ? { 'If-Modified-Since': lastModified } : {}
            });

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
                console.log("updates cartcontext.jsx")
                setLastModified(lastModifiedHeader);
            }
        } catch (error) {
            console.error('Error while fetching data:', error);
        }
    };

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