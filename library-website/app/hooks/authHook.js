import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Check if the token is expired
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('token');
          if (currentPath !== '/login') {
            window.location.href = '/login';
          }
        } else {
          // Redirect to /home if the token is valid
          if (currentPath === '/login' || currentPath === '/register') {
            window.location.href = '/home';
          }
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        if (currentPath !== '/login') {
          window.location.href = '/login';
        }
      }
    } else {
      if (currentPath !== '/login') {
        window.location.href = '/login';
      }
    }
  }, []);
};

export default useAuth;
