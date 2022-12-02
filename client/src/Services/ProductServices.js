import http from "./AxiosContext"


const getAll=()=>{
    return http.get("/products/products")
}

const getOne =(id)=>{
    return http.get(`/products/product/${id}`)
}



export default {
    getAll,
    getOne
}