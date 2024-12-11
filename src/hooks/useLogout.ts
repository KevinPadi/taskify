import axios from 'axios'

const logoutRequest = async () => {
  const response = await axios.post('http://localhost:3000/api/logout')
  return response

}

export default logoutRequest
