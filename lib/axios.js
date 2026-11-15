// lib/axios.js
// One shared axios instance, used by Server Components, Server Actions
// and Client Components alike.
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json; charset=UTF-8' },
})

export default api
