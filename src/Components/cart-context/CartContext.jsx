import { createContext, useEffect, useState } from "react";
import { useQuery } from 'react-query';

export const CartContext = createContext(null);

export const CartProvider = ({children}) => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/.netlify/functions/functions/cart/list');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    
    if (isLoading) {
        return <div>Loading...</div>
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