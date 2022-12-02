import http from './AxiosContext'


const getAll=()=>{
    return http.get("/categories/categories")
}

export default {
    getAll,
  
}