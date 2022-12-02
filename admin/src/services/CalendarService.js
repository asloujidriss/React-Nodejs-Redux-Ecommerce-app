import http from './AxiosContext'


const create =(data)=>{
    return http.post("/calendars/create",data)
}

const getall =()=>{
    return http.get("/calendars/getall",)
}
const remove =(id)=>{
return http.delete(`/calendars/delete/${id}`,)
}

export default {
    create,
    getall,
    remove
}