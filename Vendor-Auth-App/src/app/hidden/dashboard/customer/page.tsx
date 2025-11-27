'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function CustomerDashboard() {
  const { user, logout, isVendor } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Fix hydration error by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (!mounted) {
    return null; // Prevent SSR mismatch
  }

  return (
    <ProtectedRoute allowedRoles={['Customer']}>
      <div className="min-h-screen">
      {/* Header */}
      {/* <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-white">Customer Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 hidden sm:inline">{user?.fullName}</span>
              {isVendor && (
                <button
                  onClick={() => router.push('/hidden/dashboard/vendor')}
                  className="px-3 sm:px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/50 transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span className="hidden sm:inline">Switch to Vendor</span>
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-3 sm:px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/50 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Welcome back, {user?.fullName}!
              </h2>
              <p className="text-gray-300">
                Explore vendors and services tailored to your needs.
              </p>
            </div>
            {!isVendor ? (
              <button
                onClick={() => router.push('/register-vendor')}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                🚀 Become a Vendor
              </button>
            ) : (
              <div className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Vendor Account Active</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl border border-white/20 p-6 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Events</p>
                <p className="text-3xl font-bold text-white mt-2">0</p>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl border border-white/20 p-6 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Favorites</p>
                <p className="text-3xl font-bold text-white mt-2">0</p>
              </div>
              <div className="bg-pink-500/20 p-3 rounded-lg">
                <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl border border-white/20 p-6 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Messages</p>
                <p className="text-3xl font-bold text-white mt-2">0</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => router.push('/hidden/dashboard/vendors')}
              className="flex items-center p-4 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg border border-purple-500/50 transition-all group"
            >
              <div className="bg-purple-500/30 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-white group-hover:text-purple-200">Browse Vendors</p>
                <p className="text-sm text-gray-400">Find services near you</p>
              </div>
            </button>

            <button 
              onClick={() => router.push('/hidden/dashboard/events')}
              className="flex items-center p-4 bg-pink-500/20 hover:bg-pink-500/30 rounded-lg border border-pink-500/50 transition-all group"
            >
              <div className="bg-pink-500/30 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-white group-hover:text-pink-200">My Events</p>
                <p className="text-sm text-gray-400">View and manage events</p>
              </div>
            </button>

            <button 
              onClick={() => router.push('/hidden/dashboard/messages')}
              className="flex items-center p-4 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg border border-blue-500/50 transition-all group"
            >
              <div className="bg-blue-500/30 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-white group-hover:text-blue-200">Messages</p>
                <p className="text-sm text-gray-400">Chat with vendors</p>
              </div>
            </button>

            <button 
              onClick={() => router.push('/hidden/dashboard/notifications')}
              className="flex items-center p-4 bg-green-500/20 hover:bg-green-500/30 rounded-lg border border-green-500/50 transition-all group"
            >
              <div className="bg-green-500/30 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-white group-hover:text-green-200">Notifications</p>
                <p className="text-sm text-gray-400">View updates</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}
