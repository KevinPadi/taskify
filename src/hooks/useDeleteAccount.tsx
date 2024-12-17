import axios from 'axios';

const deleteAccountRequest = async () => {
  const response = await axios.delete('http://localhost:3000/api/deleteAccount', {
    withCredentials: true,
  });
  return response;
};

export default deleteAccountRequest;
