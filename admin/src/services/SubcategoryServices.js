import http from './AxiosContext'

const getall=()=>{
    return http.get("/subcategories/subcategories")
}

const getById =(id)=>{
    return http.get(`/subcategories/subcategory/${id}`)
}
const remove =(id)=>{
      return http.delete(`/subcategories/subcategory/${id}`)
}

const deleteproduct =(id,id1)=>{
    return http.delete(`/subcategories/deleteproduct/${id}/product/${id1}`)
}



export default {
    getall,
    getById,
    remove,
    deleteproduct
}