'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/lib/api-client';
import { Notification } from '@/types';

export default function NotificationDropdown() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const data = await apiClient.get<Notification[]>(`/notifications/${user.id}`);
      
      // Merge with local read status
      const readIds = JSON.parse(localStorage.getItem('read_notifications') || '[]');
      const merged = data.map(n => ({
        ...n,
        isRead: readIds.includes(n.id)
      }));

      const unread = merged.filter(n => !n.isRead);
      setNotifications(unread);
      setUnreadCount(unread.length);
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    }
  };

  // Fetch on mount to show badge immediately
  useEffect(() => {
    if (user) {
      fetchNotifications();
      // Refresh every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleOpen = async () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setLoading(true);
      await fetchNotifications();
      setLoading(false);
    }
  };

  const markAsRead = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const readIds = JSON.parse(localStorage.getItem('read_notifications') || '[]');
    if (!readIds.includes(id)) {
      readIds.push(id);
      localStorage.setItem('read_notifications', JSON.stringify(readIds));
    }
    setNotifications(prev => prev.filter(n => n.id !== id));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleOpen}
        className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center h-4 w-4 sm:h-5 sm:w-5 rounded-full ring-2 ring-gray-900 bg-red-500 text-white text-xs font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 md:w-96 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50">
          <div className="p-3 sm:p-4 border-b border-gray-700 bg-gray-800/50">
            <h3 className="text-base sm:text-lg font-semibold text-white">Notifications</h3>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-400">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">No new notifications</div>
            ) : (
              <div className="divide-y divide-gray-700">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 sm:p-4 hover:bg-gray-800/50 transition-colors flex gap-2 sm:gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-white truncate">{notification.businessName}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Event: {notification.eventType} on {new Date(notification.eventDate).toLocaleDateString()}
                      </p>
                      {notification.title && (
                        <div className="mt-2 bg-gray-800 p-2 rounded text-xs">
                          <p className="font-semibold text-gray-300 line-clamp-1">{notification.title}</p>
                          <p className="text-gray-400 line-clamp-2">{notification.comment}</p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={(e) => markAsRead(notification.id, e)}
                      className="text-gray-500 hover:text-green-400 transition-colors p-1 flex-shrink-0"
                      title="Mark as read"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
