import axiosClient from "./axiosClient";

const exportApi = {
  getRevenue(params) {
    const url = "/api/export/totalrevenue";
    return axiosClient.get(url, { params });
  },
  getTop10(params) {
    const url = "/api/export/top10Product";
    return axiosClient.get(url, { params });
  },
};

export default exportApi;
