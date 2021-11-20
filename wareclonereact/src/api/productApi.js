import axiosClient from "./axiosClient";

const productApi = {
  getAll: (params) => {
    const url = "/api/product/getAll";
    return axiosClient.get(url, { params });
  },
  get: (id) => {
    const url = `/api/product/${id}`;
    return axiosClient.get(url);
  },
  create: (payload) => {
    const url = `/api/product/create`;
    return axiosClient.post(url, { ...payload });
  },
  edit: (payload, id) => {
    const url = `/api/product/update/${id}`;
    return axiosClient.post(url, { ...payload });
  },
  delete(id) {
    const url = `/api/product/delete/${id}`;
    return axiosClient.post(url, {});
  },
};

export default productApi;
