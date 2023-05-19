import './App.css';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainPage from './Components/mainpage/mainpage';
import ShopList from './Components/shoplist/shoplist';
import Login from './Components/login/login';
import Register from './Components/register/register';
import SearchResults from './Components/searchResults/searchResults';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const queryClient = new QueryClient();

function App() {  
  const [isLoggedIn, LogIn] = useState(false);  
  const [searchInfo, setSearchInfo] = useState({});

  return (      
    <div className="App">  
     <QueryClientProvider client={queryClient}>
     <Router>
          <Routes>
            <Route path='/' element={<MainPage searchInfo={searchInfo} setSearchInfo={setSearchInfo}/>}/>
            <Route path='/shoppinglist' element={<ShopList />}/>
            <Route path='/search' element={<SearchResults searchInfo={searchInfo} setSearchInfo={setSearchInfo}/>}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
          </Routes>
      </Router>     
      </QueryClientProvider>
    </div>
  )
}

export default App
