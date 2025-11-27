'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import ChatInterface from '@/components/ChatInterface';

export default function MessagesPage() {
  return (
    <ProtectedRoute allowedRoles={['Customer', 'Vendor']}>
      <ChatInterface />
    </ProtectedRoute>
  );
}
