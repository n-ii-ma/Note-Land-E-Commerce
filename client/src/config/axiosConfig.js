import axios from "axios";

export const axiosApiPrivate = axios.create({
  baseURL: "https://e-commerce-pern.herokuapp.com/api/v1",
  withCredentials: true,
});

export const axiosApiPublic = axios.create({
  baseURL: "https://e-commerce-pern.herokuapp.com/api/v1",
  withCredentials: false,
});
