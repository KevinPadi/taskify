import axios from 'axios';

export const VerifyToken = async () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  return axios.get(`${apiUrl}/api/verify`, {
    withCredentials: true,
  });
};
