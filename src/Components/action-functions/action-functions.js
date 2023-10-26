import { useQuery } from 'react-query';

const { isLoading, error, data, refetch } = useQuery('Yugioh Cart Data', 
      async () =>{
                let response =  await fetch(`/.netlify/functions/functions/cart/list`);
                let data = await response.json();   
                console.log("trying to load cart")
                return data
          },{
            refetchOnWindowFocus: false
          },
          []);

export {
    isLoading,
    error, 
    data,
    refetch
}