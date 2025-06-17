import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Clock, MessageCircle, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface HistoryItem {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
  messageCount: number;
}

interface HistoryPanelProps {
  onClose: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock history data
  const [historyItems] = useState<HistoryItem[]>([
    {
      id: '1',
      title: 'Understanding John 3:16',
      preview: 'Discussion about God\'s love and sacrifice...',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      messageCount: 8,
    },
    {
      id: '2',
      title: 'Prayer and Faith',
      preview: 'Exploring the relationship between prayer and faith...',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      messageCount: 12,
    },
    {
      id: '3',
      title: 'Psalms 23 Commentary',
      preview: 'Deep dive into the shepherd psalm...',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      messageCount: 15,
    },
  ]);

  const filteredHistory = historyItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      className="fixed right-0 top-0 h-full w-96 glass-card border-l border-white/30 z-40"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Chat History</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredHistory.map((item, index) => (
            <motion.div
              key={item.id}
              className="glass-card p-4 cursor-pointer hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-800 truncate flex-1">
                  {item.title}
                </h3>
                <button className="p-1 rounded hover:bg-red-100/50 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {item.preview}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{format(item.timestamp, 'MMM d, HH:mm')}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>{item.messageCount} messages</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No conversations found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};