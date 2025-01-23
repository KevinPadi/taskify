import axios from 'axios'

const logoutRequest = async () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL

  const response = await axios.post(`${apiUrl}/api/logout`)
  return response

}

export default logoutRequest
