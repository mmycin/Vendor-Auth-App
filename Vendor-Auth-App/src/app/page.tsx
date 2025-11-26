'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        const isVendor = !!user.isVendor || user.role === 'Vendor';
        const dashboardPath = isVendor ? '/dashboard/vendor' : '/dashboard/customer';
        router.push(dashboardPath);
      } else {
        // Redirect to login
        router.push('/login');
      }
    }
  }, [loading, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        <p className="mt-4 text-gray-300">Redirecting...</p>
      </div>
    </div>
  );
}
