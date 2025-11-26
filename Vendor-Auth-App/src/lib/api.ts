import { apiClient } from './api-client';
import type {
  LoginCredentials,
  LoginResponse,
  RegisterData,
  User,
  Vendor,
  Event,
  Message,
  Notification,
  Review,
} from '@/types';

// Auth API
export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<LoginResponse>('/Users/login', credentials),

  register: (data: RegisterData) =>
    apiClient.post<{ message: string }>('/Users/register', data),

  logout: () =>
    apiClient.post<{ message: string }>('/logout'),

  refresh: () =>
    apiClient.post<LoginResponse>('/refresh'),

  me: () =>
    apiClient.get<User>('/me'),
};

// User API
export const userApi = {
  getAll: () =>
    apiClient.get<User[]>('/Users'),

  getById: (id: number) =>
    apiClient.get<User>(`/Users/${id}`),

  update: (id: number, data: Partial<User>) =>
    apiClient.put<User>(`/Users/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<{ message: string }>(`/Users/${id}`),
};

// Vendor API
export const vendorApi = {
  getAll: () =>
    apiClient.get<Vendor[]>('/Vendors'),

  getById: (id: number) =>
    apiClient.get<Vendor>(`/Vendors/${id}`),

  getByUserId: (userId: number) =>
    apiClient.get<Vendor>(`/Vendors/byUser/${userId}`),

  create: (data: Partial<Vendor>) =>
    apiClient.post<Vendor>('/Vendors', data),

  createByUserId: (userId: number, data: Partial<Vendor>) =>
    apiClient.post<Vendor>(`/Vendors/byUser/${userId}`, data),

  update: (id: number, data: Partial<Vendor>) =>
    apiClient.put<Vendor>(`/Vendors/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<{ message: string }>(`/Vendors/${id}`),

  search: (query: string) =>
    apiClient.get<Vendor[]>('/Vendors/search', { query }),

  searchAll: (params?: any) =>
    apiClient.get<Vendor[]>('/Vendors/searchall', params),
};

// Event API
export const eventApi = {
  getAll: () =>
    apiClient.get<Event[]>('/Events'),

  getById: (id: number) =>
    apiClient.get<Event>(`/Events/${id}`),

  getUserEvents: (userId: number) =>
    apiClient.get<Event[]>(`/Events/user/${userId}`),

  getVendorEvents: (vendorId: number) =>
    apiClient.get<Event[]>(`/Events/vendor/${vendorId}`),

  create: (data: Partial<Event>) =>
    apiClient.post<Event>('/Events', data),

  update: (id: number, data: Partial<Event>) =>
    apiClient.put<Event>(`/Events/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<{ message: string }>(`/Events/${id}`),
};

// Message API
export const messageApi = {
  getChatUsers: () =>
    apiClient.get<any[]>('/Messages/chatusers'),

  getConversation: (userId: number) =>
    apiClient.get<Message[]>(`/Messages/conversation/${userId}`),

  send: (data: { receiverId: number; content: string }) =>
    apiClient.post<Message>('/Messages', data),
};

// Notification API
export const notificationApi = {
  getAll: () =>
    apiClient.get<Notification[]>('/Notifications'),

  markAsRead: (id: number) =>
    apiClient.put<Notification>(`/Notifications/${id}`, { isRead: true }),
};

// Review API
export const reviewApi = {
  getByEvent: (eventId: number) =>
    apiClient.get<Review[]>(`/Reviews/event/${eventId}`),

  create: (data: Partial<Review>) =>
    apiClient.post<Review>('/Reviews', data),
};
