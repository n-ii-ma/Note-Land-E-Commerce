import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";

export const axiosApiPrivate = axios.create({
  baseURL: isProduction
    ? "https://e-commerce-pern.cyclic.app/api/v1"
    : "http://localhost:3000/api/v1",
  withCredentials: true,
});

export const axiosApiPublic = axios.create({
  baseURL: isProduction
    ? "https://e-commerce-pern.cyclic.app/api/v1"
    : "http://localhost:3000/api/v1",
  withCredentials: false,
});
