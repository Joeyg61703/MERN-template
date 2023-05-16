import axios from 'axios';

const api = axios.create({
    baseURL:   import.meta.env.VITE_ENVIRONMENT_TYPE === 'production'
    ? import.meta.env.VITE_PRODUCTION_API_URL
    : import.meta.env.VITE_DEVELOPMENT_API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;