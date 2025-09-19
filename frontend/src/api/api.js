// frontend/src/api/api.js
import axios from 'axios';

// Create Axios instance
const API = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error
      alert('Network error. Please check your connection.');
    } else if (error.response.status === 401) {
      // Unauthorized
      localStorage.removeItem('token');
      alert('Session expired. Please log in again.');
      window.location.href = '/auth';
    } else if (error.response.status >= 500) {
      alert('Server error. Please try again later.');
    }
    return Promise.reject(error);
  }
);

export default API;
