'use client';

import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { Event } from '@/types';

interface EventSearchProps {
  events: Event[];
  onFilter: (filtered: Event[]) => void;
}

export default function EventSearch({ events, onFilter }: EventSearchProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    date: '',
    vendor: '',
    type: '',
  });

  useEffect(() => {
    let result = events;

    // Apply filters
    if (filters.date) {
      result = result.filter(e => e.eventDate === filters.date);
    }
    if (filters.vendor) {
      result = result.filter(e => 
        e.vendor?.businessName.toLowerCase().includes(filters.vendor.toLowerCase())
      );
    }
    if (filters.type) {
      result = result.filter(e => 
        e.eventType.toLowerCase().includes(filters.type.toLowerCase())
      );
    }

    // Apply Fuse.js search
    if (query) {
      const fuse = new Fuse(result, {
        keys: ['eventType', 'description', 'vendor.businessName', 'dietaryRestrictions'],
        threshold: 0.4,
      });
      result = fuse.search(query).map(r => r.item);
    }

    onFilter(result);
  }, [events, query, filters, onFilter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search events..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Filter by Date"
          />
        </div>

        <div>
          <input
            type="text"
            name="vendor"
            value={filters.vendor}
            onChange={handleFilterChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Filter by Vendor"
          />
        </div>

        <div>
          <input
            type="text"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Filter by Type"
          />
        </div>
        
        <div className="flex items-end">
           <button 
             onClick={() => {
                setQuery('');
                setFilters({ date: '', vendor: '', type: '' });
             }}
             className="w-full px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
           >
             Clear Filters
           </button>
        </div>
      </div>
    </div>
  );
}
