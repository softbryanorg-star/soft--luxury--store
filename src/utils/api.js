import axios from 'axios';
import { setAuth, clearAuth } from './auth';

const DEFAULT_BACKEND = 'https://soft-luxury-store-backend.onrender.com';
// Prefer explicit VITE_API_URL. Use localhost in dev, otherwise use DEFAULT_BACKEND.
const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : DEFAULT_BACKEND);

const API = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // send httpOnly cookies
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (!original) return Promise.reject(error);
    if (error.response && error.response.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const res = await API.post('/api/auth/refresh'); // now uses the same instance
        const { token, user } = res.data;
        if (token) {
          setAuth(token, user);
          original.headers['Authorization'] = `Bearer ${token}`;
        }
        return API(original);
      } catch (e) {
        clearAuth();
        window.location.href = '/login';
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default API;