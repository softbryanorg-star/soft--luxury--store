import axios from 'axios';

const TOKEN_KEY = 'luxury_store_token';
const USER_KEY = 'luxury_store_user';

export function setAuth(token, user) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  delete axios.defaults.headers.common['Authorization'];
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  const s = localStorage.getItem(USER_KEY);
  try { return s ? JSON.parse(s) : null; } catch { return null; }
}

// attach token on app startup
export function attachTokenFromStorage() {
  const t = getToken();
  if (t) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${t}`;
    return;
  }

  // safe migration: if older keys ('token'/'user') exist from previous versions,
  // migrate them into the new keys so the app continues to work without manual steps.
  try {
    const legacyToken = localStorage.getItem('token');
    const legacyUser = localStorage.getItem('user');
    if (legacyToken) {
      localStorage.setItem(TOKEN_KEY, legacyToken);
      if (legacyUser) localStorage.setItem(USER_KEY, legacyUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${legacyToken}`;
      // eslint-disable-next-line no-console
      console.info('Auth: migrated legacy token to new storage keys');
    }
  } catch (e) {
    // ignore storage errors
  }
}

// Axios interceptor to handle 401 by attempting refresh
export function attachAxiosRefresh(API_BASE = (import.meta.env.VITE_BASE_URL || '')) {
  axios.interceptors.response.use(response => response, async error => {
    const original = error.config;
    if (error.response && error.response.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const res = await axios.post(`${API_BASE}/api/auth/refresh`, {}, { withCredentials: true });
        const { token, user } = res.data;
        if (token) setAuth(token, user);
        original.headers['Authorization'] = `Bearer ${token}`;
        return axios(original);
      } catch (e) {
        clearAuth();
        throw error;
      }
    }
    throw error;
  });
}

export default {
  setAuth, clearAuth, getToken, getUser, attachTokenFromStorage
};
// Small auth utility used by frontend routing and handlers
export function isAuthenticated() {
  try {
    return !!localStorage.getItem(TOKEN_KEY)
  } catch (e) {
    return false
  }
}


/*“HTTP is stateless, so the server does not remember users between requests by default.
To solve this, I separated authentication into two layers: access tokens and refresh tokens.

The access token is stored in localStorage and is short-lived. Its only purpose is to authenticate API requests. Even if it is exposed, it expires quickly and cannot renew itself.

The refresh token is stored in an HTTP-only cookie, which JavaScript cannot access. This protects it from XSS attacks. When the access token expires, the refresh token is automatically sent by the browser to request a new one.

This design balances security risks: localStorage avoids CSRF issues for access tokens, while HTTP-only cookies protect refresh tokens from JavaScript attacks. All real authorization is still enforced on the backend.

So instead of relying on one token, I used a layered approach that reduces attack surface and follows modern security best practices.”











“I used localStorage for short-lived access tokens and 
HTTP-only cookies for refresh tokens to balance XSS and CSRF risks. 
Even if an access token leaks, it expires quickly and cannot refresh itself without the HTTP-only cookie. 
Real security is enforced on the backend.”


*/