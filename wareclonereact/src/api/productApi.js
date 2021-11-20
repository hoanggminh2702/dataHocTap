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
  create: (data) => {
    const url = `/api/product/create`;
    return axiosClient.post(url, { ...data });
  },
  edit: (data) => {
    const url = `/api/product/update`;
    return axiosClient.post(url, { ...data });
  },
  delete(id) {
    const url = `/api/product/${id}`;
    return axiosClient.post(url, {});
  },
};

export default productApi;
