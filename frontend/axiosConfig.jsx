import axios from "axios";
import { toast } from "react-hot-toast";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Use environment variable for base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No token found! Ensure the user is authenticated.");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Handle unauthorized errors
      localStorage.removeItem("token");
      window.location.replace("/login");
    }

    // Display toast notification for errors
    toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    return Promise.reject(error);
  }
);

export default axiosInstance;
