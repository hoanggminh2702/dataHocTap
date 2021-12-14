import axiosClient from "./axiosClient";

const userApi = {
  login(data) {
    const url = "/api/login";
    return axiosClient.post(url, { ...data });
  },

  create(data) {
    const url = "/api/createUser";
    return axiosClient.post(url, { ...data });
  },
};

export default userApi;
