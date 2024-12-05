import axios from 'axios';
import Cookies from 'js-cookie';


export const VerifyToken = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get("token"); // Solo el valor del token
  return axios.get(`${apiUrl}/api/verify`, {
    headers: {
      Authorization: `Bearer ${token}`, // Pasa el token en el header
    },
  });
};