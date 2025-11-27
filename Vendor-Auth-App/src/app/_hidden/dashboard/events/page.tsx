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
  const { user, logout } = useAuth();
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
      setEvents(data);
      setFilteredEvents(data); // Initial state
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
      fetchEvents(); // Refresh list
    } catch (error) {
      console.error('Failed to delete event', error);
      alert('Failed to delete event');
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    fetchEvents();
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <ProtectedRoute allowedRoles={['Customer']}>
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
                <h1 className="text-xl font-bold text-white">My Events</h1>
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
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Manage Events</h2>
            <button
              onClick={handleCreate}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Event
            </button>
          </div>

          <EventSearch events={events} onFilter={setFilteredEvents} />

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading events...</p>
            </div>
          ) : (
            <EventList 
              events={filteredEvents} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          )}
        </main>

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
