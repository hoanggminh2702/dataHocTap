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
  create: (payload, token) => {
    const url = `/api/product/create`;
    return axiosClient.post(
      url,
      { ...payload },
      {
        headers: {
          Authorization: `Beare ${token}`,
        },
      }
    );
  },
  edit: (payload, id, token) => {
    const url = `/api/product/update/${id}`;
    return axiosClient.post(
      url,
      { ...payload },
      {
        headers: {
          Authorization: `Beare ${token}`,
        },
      }
    );
  },
  delete(id, token) {
    const url = `/api/product/delete/${id}`;
    return axiosClient.post(
      url,
      {},
      {
        headers: {
          Authorization: `Beare ${token}`,
        },
      }
    );
  },
};

export default productApi;
