
import API from "../api/axios"; 

export const fetchProducts = async () => {
  const res = await API.get("/products");
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};
