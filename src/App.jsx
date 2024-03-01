import './App.css';
import { useState, useEffect } from 'react';
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
import { useCookies } from "react-cookie";

  const queryClient = new QueryClient();

function App() {  
  const [isLoggedIn, LogIn] = useState(false);  
  const [givenUserId, setUserId] = useState("");
  const [doesJWTExist, JWTStatus] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  
  let localStorageUserId = localStorage.getItem("Login UserId");

 useEffect(() => {
  setUserId(() => {
    if(localStorageUserId){
      return localStorageUserId
    }else{
      return `0`
    }
  })
 },[isLoggedIn])

  //honestly i dont know how to block routes with this token
  function handleAuthentication(e){
    e.preventDefault();
    const jwtAuth = fetch("/.netlify/functions/functions/checkAuth", {
      method: 'GET', 
      headers:{
        "access-token": cookies.accessToken
      }
    })

    jwtAuth.then(res => {
      //console.log("Token is here AUTHENTICATION TOKEN",res.headers.access-token)
      let token = res.headers.access-token;
      if(token){
        return JWTStatus(true);
      }else{
        return JWTStatus(false)
      }
      //if token exists
      //make an obj prop that has auth token or user
      //send prop to protected routes
    })
    .catch(err => console.log("unable to retrieve jwt", err))
  }


  return (      
    <div className="App">
    <Toaster position="top-center"/>  
      <QueryClientProvider client={queryClient}>
        <CartProvider>
            <Router>
                  <Routes>
                    <Route path='/' element={
                                          <MainPage 
                                                LogIn={LogIn} 
                                                isLoggedIn={isLoggedIn} 
                                                givenUserId={givenUserId}/>
                                                }/>
                    <Route path='/shoppinglist' element={<ShopList givenUserId={givenUserId}/>}/>
                  
                    <Route path='/login' element={<Login 
                                                      LogIn={LogIn} 
                                                      isLoggedIn={isLoggedIn} 
                                                      givenUserId={givenUserId} 
                                                      setUserId={setUserId}/>
                                                      }/>
                    <Route path='/register' element={<Register />}/>
                    <Route path='/profile' element={<Profile />}/>
                    <Route component={<NotFound/>}/>
                  </Routes>
              </Router>    
        </CartProvider> 
      </QueryClientProvider>
    </div>
  )
}

export default App
