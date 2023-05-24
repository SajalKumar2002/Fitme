import axios from 'axios'

const http = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
     Accept: "application/json",
     "Content-Type": "application/json"
  }, withCredentials: true,
})
export default http