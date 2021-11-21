import axiosClient from "./axiosClient";

const orderApi = {
  getAll(params) {
    const url = "/api/order/getAll";
    return axiosClient.get(url, { params });
  },
  create(data) {
    const url = "/api/order/create";
    return axiosClient.post(url, { ...data });
  },
};

export default orderApi;
