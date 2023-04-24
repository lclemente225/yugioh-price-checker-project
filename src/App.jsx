import './App.css';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainPage from './Components/mainpage/mainpage';
import ShopList from './Components/shoplist/shoplist';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const queryClient = new QueryClient();

function App() {  

  return (      
    <div className="App">  
     <QueryClientProvider client={queryClient}>
     <Router>
          <Routes>
            <Route path='/' element={<MainPage />}/>
            <Route path='/shoppinglist' element={<ShopList />}/>
          </Routes>
      </Router>     
      </QueryClientProvider>
    </div>
  )
}

export default App
