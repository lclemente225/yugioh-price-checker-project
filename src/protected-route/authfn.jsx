import { useCookies } from 'react-cookie';

const useAccessToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  const setAccessToken = (token) => {
    setCookie('accessToken', token, { maxAge: 10000, path: '/' });
  };

  const removeAccessToken = () => {
    removeCookie(['accessToken']);
  };

  return {
    accessTokenObj: cookies.accessToken,
    setAccessToken,
    removeAccessToken,
  };
}; 

export default useAccessToken;
