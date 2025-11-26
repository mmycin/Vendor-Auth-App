import type { JWTPayload } from '@/types';

export function decodeJWT(token: string): JWTPayload | null {
  try {
    // JWT tokens have 3 parts: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    // Decode the payload (second part)
    const payload = parts[1];
    // Replace URL-safe characters
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding if needed
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
    // Decode and parse
    const decoded = JSON.parse(atob(padded));
    return decoded;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

export function isTokenValid(token: string): boolean {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return false;
  
  // Check if token is expired (exp is in seconds, Date.now() is in milliseconds)
  return decoded.exp > Math.floor(Date.now() / 1000);
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

export function setStoredToken(token: string, userId?: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
  if (userId) {
    localStorage.setItem('user_id', userId.toString());
  }
}

export function removeStoredToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_id');
}
