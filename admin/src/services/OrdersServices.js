import http from './AxiosContext'


const getorders =()=>{
  return  http.get("/orders/allorders")
}

const getById =(id)=>{
    return http.get(`/orders/Order/${id}`)
}
const remove =(id)=>{
      return http.delete(`/orders/Order/${id}`)
}
export default {
    getorders,
    getById,
    remove

}