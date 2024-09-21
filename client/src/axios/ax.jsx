import axios from 'axios';

// Create an Axios instance
const ax = axios.create({
  baseURL: 'http://localhost:8080', // Set your base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add JWT token to headers
    }

    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default ax;
