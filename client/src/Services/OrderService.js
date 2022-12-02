import http from './AxiosContext'


const create = (data)=>{
    return http.post("/orders/create",data)
}



export default {
    create,
  
}