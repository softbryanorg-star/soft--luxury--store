import axios from 'axios';
import { setAuth, clearAuth } from './auth';

// Initialize axios defaults
const API_BASE = import.meta.env.VITE_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';
axios.defaults.baseURL = API_BASE;
axios.defaults.withCredentials = true; // send httpOnly cookies

// Interceptor to handle 401 -> try refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (!original) return Promise.reject(error);
    if (error.response && error.response.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const res = await axios.post('/api/auth/refresh');
        const { token, user } = res.data;
        if (token) {
          setAuth(token, user);
          original.headers['Authorization'] = `Bearer ${token}`;
        }
        return axios(original);
      } catch (e) {
        // refresh failed — clear local auth and redirect to login
        clearAuth();
        try { window.location.href = '/Login'; } catch {}
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
