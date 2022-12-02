import http from './AxiosContext'


const create = data => {
    return http.post("/clients/create", data);
  };

  const getOne =(id)=>{
    return http.get(`/clients/getbyId/${id}`)
}


  export default {
    create,
    getOne
  }