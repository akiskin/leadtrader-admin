import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  validateStatus: function (status) {
    return status >= 200 && status < 500; // don't throw on 401, etc
  },
});

export default apiClient;
