import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,  // ✅ Will pick from .env
  withCredentials: true  // ✅ Important for cookies/session
});

export default api;
