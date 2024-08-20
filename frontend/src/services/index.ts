import axios from 'axios'

const REACT_APP_BACKENDURL = import.meta.env.VITE_BACKENDURL

export const ip = `${REACT_APP_BACKENDURL}`

const acessToken = localStorage.getItem('token')

const api = axios.create({
  baseURL: `${ip}/`,
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'x-access-token': acessToken
  }
})

export default api
