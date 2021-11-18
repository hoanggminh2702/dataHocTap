import axiosClient from "./axiosClient";

const productApi = {
  getAll: (params) => {
    const url = "/api/getproducts";
    return axiosClient.get(url, { params });
  },
  get: (id) => {
    const url = `/api/product/${id}`;
    return axiosClient.get(url);
  },
};

export default productApi;
