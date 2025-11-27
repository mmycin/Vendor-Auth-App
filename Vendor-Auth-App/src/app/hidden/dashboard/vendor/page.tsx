'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function VendorDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (!mounted) {
    return null;
  }

  return (
    <ProtectedRoute allowedRoles={['Vendor']}>
      <div className="min-h-screen">
      {/* Header */}
      {/* <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-white">Vendor Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 hidden sm:inline">{user?.fullName}</span>
              <button
                onClick={() => router.push('/hidden/dashboard/customer')}
                className="px-3 sm:px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-500/50 transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span className="hidden sm:inline">Switch to Customer</span>
              </button>
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
          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome, {user?.fullName}!
          </h2>
          <p className="text-gray-300">
            Manage your business and connect with customers.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl border border-white/20 p-6 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-white mt-2">$0</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl border border-white/20 p-6 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Events</p>
                <p className="text-3xl font-bold text-white mt-2">0</p>
              </div>
              <div className="bg-pink-500/20 p-3 rounded-lg">
                <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl border border-white/20 p-6 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Reviews</p>
                <p className="text-3xl font-bold text-white mt-2">0</p>
              </div>
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl border border-white/20 p-6 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Avg Rating</p>
                <p className="text-3xl font-bold text-white mt-2">0.0</p>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button 
                onClick={() => router.push('/hidden/dashboard/vendor/events')}
                className="w-full flex items-center p-4 bg-pink-500/20 hover:bg-pink-500/30 rounded-lg border border-pink-500/50 transition-all group"
              >
                <div className="bg-pink-500/30 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white group-hover:text-pink-200">Manage Events</p>
                  <p className="text-sm text-gray-400">View and manage your events</p>
                </div>
              </button>

              <button 
                onClick={() => router.push('/hidden/dashboard/messages')}
                className="w-full flex items-center p-4 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg border border-purple-500/50 transition-all group"
              >
                <div className="bg-purple-500/30 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white group-hover:text-purple-200">Messages</p>
                  <p className="text-sm text-gray-400">Chat with customers</p>
                </div>
              </button>

              <button 
                onClick={() => router.push('/hidden/dashboard/notifications')}
                className="w-full flex items-center p-4 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg border border-blue-500/50 transition-all group"
              >
                <div className="bg-blue-500/30 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white group-hover:text-blue-200">Notifications</p>
                  <p className="text-sm text-gray-400">View updates</p>
                </div>
              </button>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm">No recent activity</p>
                  <p className="text-gray-400 text-xs mt-1">Start managing your business to see updates here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}
