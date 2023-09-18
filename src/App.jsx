import './App.css';
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainPage from './Components/mainpage/mainpage';
import ShopList from './Components/shoplist/shoplist';
import Login from './Components/login/login';
import Register from './Components/register/register';
import Profile from './Components/profile/profile';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


const queryClient = new QueryClient();

function App() {  
  const [isLoggedIn, LogIn] = useState(false);  
  const [searchInfo, setSearchInfo] = useState({});
  const [givenUserId, setUserId] = useState("");
  
  
  let localStorageUserId = localStorage.getItem("Login UserId");


 useEffect(() => {
  /* function generateRandom10DigitNumber() {
    const min = 1000000000; // Smallest 10-digit number
    const max = 9999999999; // Largest 10-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } */
  //how do i make it so that i save cart info in the local storage?
  setUserId(() => {
    if(localStorageUserId){
      return localStorageUserId
    }else{
      return `0`
    }
  })
 },[isLoggedIn])
 
 console.log("USERID",givenUserId);


  //honestly i dont know how to block routes with this token
  function handleAuthentication(e){
    e.preventDefault();
    const jwtAuth = fetch("https://shy-rose-apron.cyclic.cloud/checkAuth", {
      method: 'GET', headers:{"access-token": localStorage.getItem("token")}
    })

    jwtAuth.then(res => {
      console.log("Token is here AUTHENTICATION TOKEN",res.headers.access-token)
      let token = res.headers.access-token;
      //if token exists
      //make an obj prop that has auth token or user
      //send prop to protected routes
    })
    .catch(err => console.log("unable to retrieve jwt", err))
  }


  return (      
    <div className="App">  
     <QueryClientProvider client={queryClient}>
     <Router>
          <Routes>
            <Route path='/' element={
                                  <MainPage 
                                        searchInfo={searchInfo} 
                                        setSearchInfo={setSearchInfo}
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
          </Routes>
      </Router>     
      </QueryClientProvider>
    </div>
  )
}

export default App
