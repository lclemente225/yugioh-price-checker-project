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


const queryClient = new QueryClient();

function App() {  
  const [isLoggedIn, LogIn] = useState(false);  
  const [givenUserId, setUserId] = useState("");
  const [doesJWTExist, JWTStatus] = useState(false);
  
  
  let localStorageUserId = localStorage.getItem("Login UserId");


 useEffect(() => {
  //how do i make it so that i save cart info in the local storage?
  //9/25/23 FIGURING IT OUT RIGHT NOW possibly gunns use usecontext hook
  setUserId(() => {
    if(localStorageUserId){
      return localStorageUserId
    }else{
      return `0`
    }
  })
 },[isLoggedIn])
 
 //console.log("USERID",givenUserId);


  //honestly i dont know how to block routes with this token
  function handleAuthentication(e){
    e.preventDefault();
    const jwtAuth = fetch("/.netlify/functions/functions/checkAuth", {
      method: 'GET', 
      headers:{
        "access-token": localStorage.getItem("token")
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
      <CartProvider>
        <QueryClientProvider client={queryClient}>
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
          </QueryClientProvider>
      </CartProvider>
    </div>
  )
}

export default App
