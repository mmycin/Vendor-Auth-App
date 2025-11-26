// User types
export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  role: string;
  area?: string;
  created_at?: string;
  updated_at?: string;
  vendor?: Vendor | null;
  isVendor?: boolean;
}

// Vendor types
export interface Vendor {
  id: number;
  userId: number;
  businessName: string;
  contactName: string;
  businessPhone: string;
  businessEmail: string;
  businessAddress: string;
  serviceArea: string;
  serviceType: string;
  description: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  ratingAverage: number;
  reviewCount: number;
  listings?: string | null;
  created_at?: string;
  updated_at?: string;
}

// Event types
export interface Event {
  id: number;
  userId: number;
  vendorId?: number;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  budget?: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

// Message types
export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  isRead: boolean;
  created_at?: string;
  updated_at?: string;
}

// Notification types
export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  created_at?: string;
  updated_at?: string;
}

// Review types
export interface Review {
  id: number;
  userId: number;
  vendorId: number;
  eventId: number;
  rating: number;
  comment: string;
  created_at?: string;
  updated_at?: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  role?: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// JWT Payload
export interface JWTPayload {
  nameid: string;
  unique_name: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
  isVendor?: boolean;
}
