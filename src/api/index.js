import axios from 'axios'

const baseURL = '123'

const http = axios.create({
    baseURL: baseUrl,
    timeout: 15000,
    headers: {}
  })

  export default http