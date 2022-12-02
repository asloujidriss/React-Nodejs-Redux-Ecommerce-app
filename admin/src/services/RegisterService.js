import http from "./AxiosContext";


const create = data => {
    return http.post("/clients/create", data);
  };

  export default {
    
    create

  };