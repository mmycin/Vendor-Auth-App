'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import ChatInterface from '@/components/ChatInterface';
import NotificationDropdown from '@/components/NotificationDropdown';
import { useRouter } from 'next/navigation';

export default function MessagesPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <ProtectedRoute allowedRoles={['Customer', 'Vendor']}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        {/* Navbar */}
        <nav className="sticky top-0 z-40 backdrop-blur-lg bg-white/10 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => router.back()}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <h1 className="text-xl font-bold text-white">Messages</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 hidden sm:inline">{user?.fullName}</span>
                <NotificationDropdown />
                <button
                  onClick={handleLogout}
                  className="px-3 sm:px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/50 transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ChatInterface />
        </main>
      </div>
    </ProtectedRoute>
  );
}
