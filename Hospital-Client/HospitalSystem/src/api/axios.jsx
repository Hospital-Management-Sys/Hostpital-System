import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api' , // Replace with your actual base URL
  headers: {
    'Content-Type': 'application/json',
    // Add any other custom headers you need, such as authorization tokens
  },
});

export default axiosInstance;

