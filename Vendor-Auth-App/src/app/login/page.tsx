'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Notify from 'notifier-mycin';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAsVendor, setLoginAsVendor] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login, isVendor, isAuthenticated, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    setLoading(true);

    try {
      await login({ email, password });
      
      Notify.success('Login successful');
      
      // Redirect based on checkbox state
      if (loginAsVendor) {
        router.push('/dashboard/vendor');
      } else {
        router.push('/dashboard/customer');
      }
    } catch (err: any) {
      const msg = err.message || 'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8">
          <div>
            <h2 className="text-center text-4xl font-extrabold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-sm text-gray-300">
              Sign in to your account
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-lg bg-red-500/20 border border-red-500/50 p-4">
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="loginAsVendor"
                  type="checkbox"
                  checked={loginAsVendor}
                  onChange={(e) => setLoginAsVendor(e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="loginAsVendor" className="ml-2 block text-sm text-gray-200">
                  Login as Vendor
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-300">
                Don't have an account?{' '}
                <Link
                  href="/register"
                  className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Register as Customer
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
