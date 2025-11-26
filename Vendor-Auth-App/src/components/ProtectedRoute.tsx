'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (allowedRoles) {
        const isVendor = !!user?.isVendor || user!.role === 'Vendor';
        const wantsVendor = allowedRoles.includes('Vendor');
        // Vendors can access both vendor and customer pages
        // Regular customers can only access customer pages
        const authorized = wantsVendor ? isVendor : true;
        if (!authorized) {
          router.push('/dashboard/customer');
        }
      }
    }
  }, [loading, isAuthenticated, user, allowedRoles, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles) {
    const isVendor = !!user?.isVendor || user!.role === 'Vendor';
    const wantsVendor = allowedRoles.includes('Vendor');
    // Vendors can access both vendor and customer pages
    // Regular customers can only access customer pages
    const authorized = wantsVendor ? isVendor : true;
    if (!authorized) {
      return null;
    }
  }

  return <>{children}</>;
}
