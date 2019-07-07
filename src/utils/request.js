import axios from 'axios'
import store from '../store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL:process.env.BASE_API,// api 的 base_url
  timeout:50000,
});

service.interceptors.request.use(
  config =>{
   if (store.getters.token) {
     config.headers['token'] =getToken()
   }
   return config
  },
  error=>{
    console.log(error); // for debug
    Promise.reject(error)
  }
);


service.interceptors.response.use(
    response=>{
      const code = response.data;
      if (code.code === 0 ){
        return response.data;
      }else{
        alert(code.message)
      }
    },
  error=>{
    console.log(error); // for debug
    Promise.reject(error)
  }
)

export default service;
