'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { loggingOut } = useAuth();

  // Default theme (dark slate)
  let bgClass = "bg-slate-900";

  // Vendor Dashboard Theme (Pinkish)
  if (pathname?.startsWith('/dashboard/vendor')) {
    bgClass = "bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900";
  } 
  // Customer Dashboard Theme (Purpleish)
  else if (pathname?.startsWith('/dashboard/customer')) {
    bgClass = "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900";
  }
  // Login/Register or other pages (Global Dark)
  else {
    bgClass = "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900";
  }

  return (
    <>
      {loggingOut && <Preloader message="Logging out..." />}
      <div className={`min-h-screen flex flex-col ${bgClass}`}>
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
