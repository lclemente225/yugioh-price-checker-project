import './App.css';
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainPage from './Components/mainpage/mainpage';
import ShopList from './Components/shoplist/shoplist';
import Login from './Components/login/login';
import Register from './Components/register/register';
import SearchResults from './Components/searchResults/searchResults';
import Profile from './Components/profile/profile';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


const queryClient = new QueryClient();

function App() {  
  const [isLoggedIn, LogIn] = useState(false);  
  const [searchInfo, setSearchInfo] = useState({});
  const [givenUserId, setUserId] = useState("");
  
  
  let localStorageUserId = localStorage.getItem("Login UserId");


 useEffect(() => {
  setUserId(() => {
    if(localStorageUserId){
      return localStorageUserId
    }else{
      return 0
    }
  })
 },[])
 
 console.log("USERID",givenUserId);


  
  function handleAuthentication(e){
    e.preventDefault();
    const jwtAuth = fetch("http://localhost:3003/checkAuth", {
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
            <Route path='/search' element={
                                          <SearchResults 
                                                    searchInfo={searchInfo} 
                                                    setSearchInfo={setSearchInfo} 
                                                    givenUserId={givenUserId} 
                                                    setUserId={setUserId}/>}/>
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
