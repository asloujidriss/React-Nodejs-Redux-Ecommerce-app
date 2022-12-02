import http from './AxiosContext'


const getAll=()=>{
    return http.get("/categories/categories")
}

const create =(data)=>{
    return http.post("/categories/create",data)
}

const remove =(id)=>{
    return http.delete(`/categories/delete/${id}`)
}

export default {
    getAll,
    create,
    remove
}