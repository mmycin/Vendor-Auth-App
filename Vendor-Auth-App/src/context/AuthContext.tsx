'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '@/lib/api';
import { apiClient } from '@/lib/api-client';
import { decodeJWT, isTokenValid, getStoredToken, removeStoredToken } from '@/lib/jwt';
import type { User, LoginCredentials } from '@/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  loggingOut: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<User>;
  logout: () => Promise<void>;
  isVendor: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  // Initialize auth state from stored token
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getStoredToken();

      if (storedToken && isTokenValid(storedToken)) {
        setToken(storedToken);
        try {
          const me = await authApi.me();
          setUser({
            ...me,
            isVendor: Boolean(me.vendor),
          });
        } catch {
          const decoded = decodeJWT(storedToken);
          if (decoded) {
            setUser({
              id: parseInt(decoded.nameid),
              fullName: decoded.unique_name,
              email: decoded.email,
              role: decoded.role,
              isVendor: decoded.isVendor,
            });
          }
        }
      }

      setLoading(false);
    };

    void initAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<User> => {
    try {
      const response = await authApi.login(credentials);
      
      // Store token
      apiClient.setToken(response.token, response.user.id);
      setToken(response.token);
      
      // Set user with vendor flag
      const userWithVendorFlag: User = {
        ...response.user,
        isVendor: Boolean(response.user.vendor) || Boolean(response.user.isVendor),
      };
      
      setUser(userWithVendorFlag);
      return userWithVendorFlag;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  }, []);

  const logout = useCallback(async () => {
    // Set logging out state
    setLoggingOut(true);
    
    // Call logout API (non-blocking)
    authApi.logout().catch(() => {
      // Ignore errors, we're logging out anyway
    });
    
    // Add a small delay for better UX
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Clear local state
        removeStoredToken();
        apiClient.removeToken();
        setToken(null);
        setUser(null);
        setLoggingOut(false);
        resolve();
      }, 800);
    });
  }, []);

  const isVendor = Boolean(user?.isVendor) || Boolean(user?.vendor) || user?.role === 'Vendor';

  const value: AuthContextType = {
    user,
    token,
    loading,
    loggingOut,
    login,
    logout,
    isAuthenticated: !!user && !!token,
    isVendor,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
