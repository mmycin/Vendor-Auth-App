import React from 'react';

interface PreloaderProps {
  message?: string;
}

export default function Preloader({ message = 'Loading...' }: PreloaderProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-20 h-20 rounded-full border-4 border-purple-500/20"></div>
          {/* Spinning ring */}
          <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500 animate-spin"></div>
          {/* Inner glow */}
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-purple-500/10 blur-xl"></div>
        </div>

        {/* Message */}
        <div className="text-center">
          <p className="text-white text-lg font-semibold mb-1">{message}</p>
          <div className="flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse [animation-delay:0.4s]"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
