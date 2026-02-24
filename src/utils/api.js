import axios from 'axios';
import { setAuth, clearAuth } from './auth';

// Fallback to your deployed backend if VITE_API_URL is not set in the environment.
// IMPORTANT: For production you should set `VITE_API_URL` to your backend URL in your hosting provider.
const DEFAULT_BACKEND = import.meta.env.VITE_API_URL || 'https://soft-luxury-store-backend.onrender.com';

// Determine base: prefer explicit VITE_API_URL; if running locally use localhost; otherwise use DEFAULT_BACKEND.
const API_BASE = import.meta.env.VITE_API_URL || DEFAULT_BACKEND;

if (!import.meta.env.VITE_API_URL) {
  // eslint-disable-next-line no-console
  console.warn('VITE_API_URL is not set — falling back to DEFAULT_BACKEND:', API_BASE);
}

const API = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // send httpOnly cookies
});

// Attach token from localStorage on each request to ensure the create() instance uses current token
API.interceptors.request.use((config) => {
  try {
    const t = localStorage.getItem('luxury_store_token');
    if (t) config.headers = { ...(config.headers || {}), Authorization: `Bearer ${t}` };
  } catch (e) {
    // ignore
  }
  return config;
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
export { API_BASE };