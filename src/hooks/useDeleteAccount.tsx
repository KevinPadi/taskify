import axios from 'axios';

const deleteAccountRequest = async () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL

  const response = await axios.delete(`${apiUrl}/api/deleteAccount`, {
    withCredentials: true,
  });
  return response;
};

export default deleteAccountRequest;
