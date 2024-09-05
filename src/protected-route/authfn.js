import { Cookies } from "react-cookie";
// Function to get the access token from cookies
export const getAccessToken = () => {
    let cookie = Cookies.getAll();
    console.log("this is the cookie access", cookie)
    return Cookies.get('accessToken');
  }
  
// Function to check if the user is authenticated
export const isAuthenticated = () => {
return !!getAccessToken();
}
   