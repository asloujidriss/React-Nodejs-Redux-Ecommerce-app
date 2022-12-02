import http from "./AxiosContext";

const getAll = () => {
  return http.get("/clients/getAll");
};

const get = id => {
  return http.get(`/clients/getbyId/${id}`);
};

const create = data => {
  return http.post("/clients/create", data);
};

const update =(id,data) => {
  return http.put(`/clients/update/${id}`, data);
};

const remove = id => {
  return http.delete(`/clients/delete/${id}`);
};
const findByName = firstName => {
    return http.get(`clients/getbyName=${firstName}`);
  };
  
  export default {
    getAll,
    get,
    create,
    update,
    remove,
    findByName
  };

