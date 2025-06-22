import API from "./api";
import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update this if your backend is on a different port
  withCredentials: true,
});

export const fetchProducts = async () => {
  const res = await API.get("/products");
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};
