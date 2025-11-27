'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/lib/api-client';
import NotificationDropdown from '@/components/NotificationDropdown';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isVendor, setIsVendor] = useState(false);
  const [checkingVendor, setCheckingVendor] = useState(true);

  useEffect(() => {
    const checkVendorStatus = async () => {
      if (!user) return;
      try {
        await apiClient.get(`/Vendors/byUser/${user.id}`);
        setIsVendor(true);
      } catch (error) {
        setIsVendor(false);
      } finally {
        setCheckingVendor(false);
      }
    };
    checkVendorStatus();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const isVendorRoute = pathname?.includes('/vendor');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Shared Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => router.back()}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-base sm:text-xl font-bold text-white">
                {isVendorRoute ? 'Vendor Portal' : 'Customer Portal'}
              </h1>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-4">
              <span className="text-gray-300 hidden md:inline text-sm">{user?.fullName}</span>
              
              {/* Switch to Vendor/Customer button */}
              {!checkingVendor && (
                <>
                  {isVendorRoute ? (
                    <button
                      onClick={() => router.push('/hidden/dashboard/customer')}
                      className="px-2 sm:px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-500/50 transition-all flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      <span className="hidden sm:inline">Switch to Customer</span>
                      <span className="sm:hidden">Customer</span>
                    </button>
                  ) : isVendor ? (
                    <button
                      onClick={() => router.push('/hidden/dashboard/vendor')}
                      className="px-2 sm:px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/50 transition-all flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      <span className="hidden sm:inline">Switch to Vendor</span>
                      <span className="sm:hidden">Vendor</span>
                    </button>
                  ) : null}
                </>
              )}
              
              <NotificationDropdown />
              <button
                onClick={handleLogout}
                className="px-2 sm:px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/50 transition-all text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {children}
      </main>
    </div>
  );
}
