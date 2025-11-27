'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/lib/api-client';
import { Event, Vendor } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import EventSearch from '@/components/EventSearch';

export default function VendorEventsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [vendorProfile, setVendorProfile] = useState<Vendor | null>(null);

  useEffect(() => {
    const fetchVendorAndEvents = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const vendor = await apiClient.get<Vendor>(`/Vendors/byUser/${user.id}`);
        setVendorProfile(vendor);

        if (vendor && vendor.id) {
          const data = await apiClient.get<Event[]>(`/events/vendor/${vendor.id}`);
          // Sort by latest
          const sorted = data.sort((a, b) => new Date(b.created_at || b.eventDate).getTime() - new Date(a.created_at || a.eventDate).getTime());
          setEvents(sorted);
          setFilteredEvents(sorted);
        }
      } catch (error) {
        console.error('Failed to fetch vendor events', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorAndEvents();
  }, [user]);

  return (
    <ProtectedRoute allowedRoles={['Vendor']}>
      <div>
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Associated Events</h2>
          <p className="text-sm sm:text-base text-gray-300">Events where you are listed as the vendor.</p>
        </div>

        <EventSearch events={events} onFilter={setFilteredEvents} />

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-gray-400 mt-4 text-sm sm:text-base">Loading events...</p>
          </div>
        ) : (
          <div className="space-y-4">
             {filteredEvents.length === 0 ? (
                <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-sm sm:text-base text-gray-400">No associated events found.</p>
                </div>
             ) : (
               filteredEvents.map(event => (
                  <div 
                    key={event.id} 
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 hover:bg-white/15 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg sm:text-xl font-bold text-white">{event.eventType}</h3>
                          <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200 border border-purple-500/30">
                            {new Date(event.eventDate).toLocaleDateString()}
                          </span>
                           <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-200 border border-green-500/30">
                            Client: {event.user?.fullName || 'Unknown'}
                          </span>
                        </div>
                        
                        <p className="text-sm sm:text-base text-gray-300 mb-4 line-clamp-2">{event.description}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
                           {event.budgetMin && event.budgetMax && (
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>Budget: ${event.budgetMin} - ${event.budgetMax}</span>
                            </div>
                          )}
                          {event.dietaryRestrictions && (
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </div>
    </ProtectedRoute>
  );
}
