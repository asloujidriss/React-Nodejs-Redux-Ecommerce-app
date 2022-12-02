import http from "./AxiosContext";




const getAll = () => {

  return http.get("/products/products")

};

const get = id => {
  return http.get(`/products/product/${id}`);
};

const create = data => {
  return http.post("/products/create",data);
};

const update = (id, data) => {
  return http.put(`/products/product/${id}`,data);
};

const remove = _id => {
  return http.delete(`/products/product/${_id}`);
};

const findByName = refProduct => {
  return http.get(`/products/products/byname=${refProduct}`);
};



export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};