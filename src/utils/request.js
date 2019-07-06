import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout:10000
})

service.interceptors.request.use(
  config =>{

  }
)
