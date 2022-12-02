import http from './AxiosContext'



const getAll = ()=>{
    return http.get("/subcategories/subcategories")
}

const getById =(id)=>{
    return http.get(`/subcategories/subcategory/${id}`)
}

export default { 
    getAll,
    getById
}