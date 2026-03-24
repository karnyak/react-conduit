import axios from 'axios';

const API_BASE = 'https://api.realworld.show/api';

export const api = axios.create({
  baseURL: API_BASE,
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Normalize errors and handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwtToken');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data ?? { errors: { network: ['Unable to connect to server'] } });
  }
);
