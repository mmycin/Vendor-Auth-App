'use client';

import React from 'react';
import { Event } from '@/types';

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: number) => void;
}

export default function EventList({ events, onEdit, onDelete }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
        <p className="text-gray-400">No events found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div 
          key={event.id} 
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all group"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-white">{event.eventType}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200 border border-purple-500/30">
                  {new Date(event.eventDate).toLocaleDateString()}
                </span>
                {event.vendor && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-200 border border-blue-500/30">
                    {event.vendor.businessName}
                  </span>
                )}
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

            <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(event)}
                className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 transition-colors"
                title="Edit Event"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(event.id)}
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 transition-colors"
                title="Delete Event"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
