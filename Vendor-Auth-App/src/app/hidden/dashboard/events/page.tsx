'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/lib/api-client';
import { Event } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import EventList from '@/components/EventList';
import EventSearch from '@/components/EventSearch';
import EventForm from '@/components/EventForm';
import NotificationDropdown from '@/components/NotificationDropdown';
import { useRouter } from 'next/navigation';

export default function CustomerEventsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>(undefined);

  const fetchEvents = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await apiClient.get<Event[]>(`/events/user/${user.id}`);
      // Sort by latest (newest first)
      const sorted = data.sort((a, b) => new Date(b.created_at || b.eventDate).getTime() - new Date(a.created_at || a.eventDate).getTime());
      setEvents(sorted);
      setFilteredEvents(sorted);
    } catch (error) {
      console.error('Failed to fetch events', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  const handleCreate = () => {
    setEditingEvent(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await apiClient.delete(`/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error('Failed to delete event', error);
      alert('Failed to delete event');
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    fetchEvents();
  };

  return (
    <ProtectedRoute allowedRoles={['Customer']}>
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Manage Events</h2>
          <button
            onClick={handleCreate}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm sm:text-base">Add New Event</span>
          </button>
        </div>

        <EventSearch events={events} onFilter={setFilteredEvents} />

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-gray-400 mt-4 text-sm sm:text-base">Loading events...</p>
          </div>
        ) : (
          <EventList 
            events={filteredEvents} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        )}

        {isFormOpen && (
          <EventForm
            initialData={editingEvent}
            onSuccess={handleFormSuccess}
            onCancel={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
