'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/lib/api-client';
import { Message, User } from '@/types';

interface ChatUser extends User {
  lastMessage?: string;
  lastMessageTime?: string;
}

export default function ChatInterface() {
  const { user } = useAuth();
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'inbox' | 'people'>('inbox');
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const previousMessagesLengthRef = useRef(0);

  useEffect(() => {
    if (user) {
      fetchChatUsers();
      fetchAllUsers();
    }
  }, [user]);

  useEffect(() => {
    if (user && selectedUser) {
      fetchConversation(selectedUser.id);
      const interval = setInterval(() => {
        fetchConversation(selectedUser.id);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [user, selectedUser]);

  useEffect(() => {
    // Only scroll to bottom if new messages were added (not when switching users)
    if (messages.length > previousMessagesLengthRef.current && previousMessagesLengthRef.current > 0) {
      scrollToBottom();
    }
    previousMessagesLengthRef.current = messages.length;
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const fetchChatUsers = async () => {
    if (!user) return;
    try {
      const users = await apiClient.get<ChatUser[]>(`/messages/chat-users/${user.id}`);
      setChatUsers(users);
    } catch (error) {
      console.error('Failed to fetch chat users', error);
    }
  };

  const fetchAllUsers = async () => {
    if (!user) return;
    try {
      const users = await apiClient.get<User[]>('/Users');
      setAllUsers(users.filter(u => u.id !== user.id));
    } catch (error) {
      console.error('Failed to fetch all users', error);
    }
  };

  const fetchConversation = async (otherUserId: number) => {
    if (!user) return;
    try {
      const data = await apiClient.get<Message[]>(`/messages/conversation/${user.id}/${otherUserId}`);
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch conversation', error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedUser || !newMessage.trim()) return;

    try {
      await apiClient.post('/messages/send', {
        senderId: user.id,
        receiverId: selectedUser.id,
        message: newMessage
      });
      setNewMessage('');
      fetchConversation(selectedUser.id);
      fetchChatUsers();
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  const handleUserSelect = (chatUser: ChatUser | User) => {
    setSelectedUser(chatUser);
    previousMessagesLengthRef.current = 0;
    setTimeout(() => scrollToBottom(), 100);
  };

  const displayUsers = activeTab === 'inbox' ? chatUsers : allUsers;

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row h-full">
        <div className="w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-white/10 bg-gray-900/50 flex flex-col max-h-[40vh] sm:max-h-full">
          <div className="flex border-b border-white/10">
            <button onClick={() => setActiveTab('inbox')} className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors ${activeTab === 'inbox' ? 'text-white bg-white/10 border-b-2 border-purple-500' : 'text-gray-400 hover:text-gray-300'}`}>
              Inbox ({chatUsers.length})
            </button>
            <button onClick={() => setActiveTab('people')} className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors ${activeTab === 'people' ? 'text-white bg-white/10 border-b-2 border-purple-500' : 'text-gray-400 hover:text-gray-300'}`}>
              People ({allUsers.length})
            </button>
          </div>
          <div className="overflow-y-auto flex-1">
            {displayUsers.length === 0 ? (
              <div className="p-4 text-gray-400 text-center text-xs  sm:text-sm">{activeTab === 'inbox' ? 'No conversations yet' : 'No users found'}</div>
            ) : (
              displayUsers.map(chatUser => (
                <button key={chatUser.id} onClick={() => handleUserSelect(chatUser)} className={`w-full p-3 sm:p-4 text-left hover:bg-white/5 transition-colors flex items-center gap-2 sm:gap-3 ${selectedUser?.id === chatUser.id ? 'bg-white/10 border-l-4 border-purple-500' : ''}`}>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">{chatUser.fullName.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-white font-medium truncate">{chatUser.fullName}</p>
                    <p className="text-xs text-gray-400 truncate">{chatUser.role}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col bg-gray-900/30">
          {selectedUser ? (
            <>
              <div className="p-3 sm:p-4 border-b border-white/10 flex items-center gap-2 sm:gap-3 bg-gray-900/50">
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">{selectedUser.fullName.charAt(0)}</div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-lg font-semibold text-white truncate">{selectedUser.fullName}</h3>
                  <p className="text-xs text-gray-400">{selectedUser.role}</p>
                </div>
              </div>
              <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-400 text-xs sm:text-sm mt-8">No messages yet. Start the conversation!</div>
                ) : (
                  messages.map((msg) => {
                    // API returns sender_id (snake_case), not senderId
                    const msgSenderId = (msg as any).sender_id || msg.senderId;
                    const senderId = Number(msgSenderId);
                    const currentUserId = Number(user?.id);
                    const isMe = senderId === currentUserId;
                    
                    console.log('MSG:', { id: msg.id, sender_id: msgSenderId, currentUser: currentUserId, isMe });
                    
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[70%]">
                          {!isMe && (
                            <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-lg">{selectedUser.fullName.charAt(0)}</div>
                          )}
                          <div className={`rounded-2xl px-3 sm:px-4 py-2 shadow-lg ${isMe ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-br-none' : 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-bl-none'}`}>
                            <p className="text-xs sm:text-sm break-words">{msg.content || (msg as any).message}</p>
                            <p className={`text-xs mt-1 ${isMe ? 'text-purple-100' : 'text-blue-100'}`}>{new Date(msg.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                          {isMe && (
                            <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs shadow-lg">{user?.fullName.charAt(0)}</div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-white/10 bg-gray-900/50">
                <div className="flex gap-2">
                  <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 text-white text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                  <button type="submit" disabled={!newMessage.trim()} className="px-3 sm:px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base">Send</button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm sm:text-base p-4 text-center">Select a conversation to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
}
