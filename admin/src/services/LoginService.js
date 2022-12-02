import http from "./AxiosContext";


const create = data => {
    return http.post("/users/login", data);
  };
 

  export default {
    create
  };