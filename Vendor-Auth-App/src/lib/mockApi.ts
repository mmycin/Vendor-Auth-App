import axios from 'axios';

// Base URL for Laravel API
const API_BASE = 'http://localhost:8000/api';

// Helper to get token from localStorage
const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

// Axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// Add a request interceptor to dynamically add auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const mockApi = {
  // Authentication
  async login(email: string, password: string) {
    const response = await api.post('/Users/login', { email, password });
    // Store token in localStorage (will also be set via Next.js API route for HttpOnly cookie)
    localStorage.setItem('auth_token', response.data.token);
    return response.data;
  },

  async registerCustomer(data: { fullName: string; email: string; phone: string; password: string; address: string }) {
    const response = await api.post('/Users/register', { ...data, role: 'Customer' });
    return response.data;
  },

  async registerVendor(userId: number, data: any) {
    const response = await api.post(`/Vendors/byUser/${userId}`, data);
    return response.data;
  },

  // Token helpers (now using localStorage only)
  async storeToken(token: string, userId: number) {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_id', userId.toString());
  },
  async getStoredToken() {
    return localStorage.getItem('auth_token');
  },
  async removeToken() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
  },

  // Utility
  decodeToken(token: string) {
    try {
      // JWT tokens have 3 parts: header.payload.signature
      // We need to decode the payload (middle part)
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }
      // Decode the payload (second part)
      const payload = parts[1];
      // Replace URL-safe characters
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      // Decode and parse
      const decoded = JSON.parse(atob(base64));
      return decoded;
    } catch {
      return null;
    }
  },
  isTokenValid(token: string) {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return false;
    return decoded.exp > Math.floor(Date.now() / 1000);
  },

  // Additional API wrappers (examples)
  async fetchUserProfile() {
    const token = getToken();
    if (!token) throw new Error('No token');
    const res = await api.get('/me');
    return res.data;
  },
  async fetchEvents() {
    const res = await api.get('/events');
    return res.data;
  },
  // ... add more as needed
};
