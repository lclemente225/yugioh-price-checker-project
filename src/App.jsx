import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainPage from './Components/mainpage/mainpage';
import ShopList from './Components/shoplist/shoplist';
import Login from './Components/login/login';
import Register from './Components/register/register';
import Profile from './Components/profile/profile';
import NotFound from './NotFound';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './Components/cart-context/CartContext';

const queryClient = new QueryClient();

function App() {  

  return (      
    <div className="App">
    <Toaster position="top-center"/>  
      <QueryClientProvider client={queryClient}>
        <CartProvider>
            <Router>
                  <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/shoppinglist' element={<ShopList/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route component={<NotFound/>}/>
                  </Routes>
              </Router>    
        </CartProvider> 
      </QueryClientProvider>
    </div>
  )
}

export default App
