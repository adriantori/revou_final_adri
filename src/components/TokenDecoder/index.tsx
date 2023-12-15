import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationContext';

interface DecodedToken {
  email: string;
  exp: number;
  iat: number;
  id: number;
  role: number;
  // Add other fields as needed
}

const TokenDecoder = (token: string | null): Promise<DecodedToken | null> => {
  const navigate = useNavigate();
  const showNotification = useNotification();
  
  return new Promise((resolve) => {
    if (!token) {
      resolve(null);
    } else {
      try {
        const decoded = jwt_decode<DecodedToken>(token);
        resolve(decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
        showNotification('error', 'Login Dulu Yaaa!', 'Login Gagal');
        navigate('/login');
        resolve(null);
      }
    }
  });
};

export default TokenDecoder;
