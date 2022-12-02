import http from "./AxiosContext";

const getAll = () => {
  return http.get("/admins/getAll");
};

const get = id => {
  return http.get(`/admins/getbyId/${id}`);
};

const create = data => {
  return http.post("/admins/create", data);
};

const update =(id,data) => {
  return http.put(`/admins/update/${id}`, data);
};

const remove = id => {
  return http.delete(`/admins/delete/${id}`);
};
const findByName = firstName => {
    return http.get(`admins/getbyName=${firstName}`);
  };
  
  export default {
    getAll,
    get,
    create,
    update,
    remove,
    findByName
  };
