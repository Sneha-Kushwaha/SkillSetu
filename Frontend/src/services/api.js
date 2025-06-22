import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change port if needed
  withCredentials: true,
});

export default API;
