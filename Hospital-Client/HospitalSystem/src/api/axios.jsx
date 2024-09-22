import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export default axiosInstance;
