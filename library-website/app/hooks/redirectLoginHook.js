import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const useAuthRedirect = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname;

    if (!token && currentPath !== '/login') {
      window.location.href = '/';
    } else if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('token');
          if (currentPath !== '/login') {
            window.location.href = '/';
          }
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        if (currentPath !== '/login') {
          window.location.href = '/login';
        }
      }
    }
  }, []);
};

export default useAuthRedirect;
