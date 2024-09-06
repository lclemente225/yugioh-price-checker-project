import { useCookies } from 'react-cookie';

const useAccessToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  const setAccessToken = (token) => {
    setCookie('accessToken', token, { maxAge: 10000, path: '/' });
  };

  const removeAccessToken = () => {
    removeCookie(['accessToken']);
  };
  console.log("cookies", cookies)

  return {
    accessTokenObj: cookies.accessToken || {userID:'0'},
    setAccessToken,
    removeAccessToken,
  };
}; 

export default useAccessToken;
