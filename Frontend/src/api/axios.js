import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Change this to your deployed backend URL later
  withCredentials: false, // Set to true if using cookies
});

export default instance;
