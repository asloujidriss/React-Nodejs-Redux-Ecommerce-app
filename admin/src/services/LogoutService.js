import http from "./AxiosContext";


const create = ()=> {
    return http.post("/users/logout");
  };

  export default {
    
    create

  };