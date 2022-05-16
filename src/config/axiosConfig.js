import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://e-commerce-pern.herokuapp.com/api/v1",
});

export default axiosApi;
