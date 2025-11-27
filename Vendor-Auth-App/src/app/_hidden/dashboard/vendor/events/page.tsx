'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/lib/api-client';
import { Event, Vendor } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import EventList from '@/components/EventList';
import EventSearch from '@/components/EventSearch';
import NotificationDropdown from '@/components/NotificationDropdown';
import { useRouter } from 'next/navigation';

export default function VendorEventsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [vendorProfile, setVendorProfile] = useState<Vendor | null>(null);

  useEffect(() => {
    const fetchVendorAndEvents = async () => {
      if (!user) return;
      try {
        setLoading(true);
        // 1. Get Vendor Profile
        const vendor = await apiClient.get<Vendor>(`/Vendors/byUser/${user.id}`);
        setVendorProfile(vendor);

        // 2. Get Events for this Vendor
        if (vendor && vendor.id) {
          const data = await apiClient.get<Event[]>(`/events/vendor/${vendor.id}`);
          setEvents(data);
          setFilteredEvents(data);
        }
      } catch (error) {
        console.error('Failed to fetch vendor events', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorAndEvents();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  // Vendors might not be able to edit/delete customer events directly via this API
  // The requirements just say "see the events he was associated with".
  // So we might disable edit/delete or handle them if API allows.
  // EventController::update checks: if (auth('api')->id() != $event->user_id) return Unauthorized.
  // So Vendors CANNOT edit events created by customers. They can only view.
  
  const handleViewDetails = (event: Event) => {
    // Placeholder for view details if needed, or just show in list
    console.log('View event', event);
  };

  return (
    <ProtectedRoute allowedRoles={['Vendor']}>
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
                <h1 className="text-xl font-bold text-white">Vendor Events</h1>
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
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">Associated Events</h2>
            <p className="text-gray-300 mt-2">Events where you are listed as the vendor.</p>
          </div>

          <EventSearch events={events} onFilter={setFilteredEvents} />

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading events...</p>
            </div>
          ) : (
            <div className="space-y-4">
               {filteredEvents.length === 0 ? (
                  <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-gray-400">No associated events found.</p>
                  </div>
               ) : (
                 filteredEvents.map(event => (
                    <div 
                      key={event.id} 
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{event.eventType}</h3>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200 border border-purple-500/30">
                              {new Date(event.eventDate).toLocaleDateString()}
                            </span>
                             <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-200 border border-green-500/30">
                              Client: {event.user?.fullName || 'Unknown'}
                            </span>
                          </div>
                          
                          <p className="text-gray-300 mb-4 line-clamp-2">{event.description}</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
                             {event.budgetMin && event.budgetMax && (
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Budget: ${event.budgetMin} - ${event.budgetMax}</span>
                              </div>
                            )}
                            {event.dietaryRestrictions && (
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                                <span>Dietary: {event.dietaryRestrictions}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                 ))
               )}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
