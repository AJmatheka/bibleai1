import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Volume2, Copy, Share } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  verse?: string;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.type === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message.content);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3 max-w-3xl`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isUser 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
              : 'bg-gradient-to-r from-green-500 to-teal-500'
          }`}>
            {isUser ? (
              <User className="w-5 h-5 text-white" />
            ) : (
              <Bot className="w-5 h-5 text-white" />
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
          <div className={`glass-card p-4 ${
            isUser 
              ? 'bg-blue-500/10 border-blue-200/30' 
              : 'bg-white/30 border-white/30'
          }`}>
            <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
            
            {/* Verse Display */}
            {message.verse && (
              <motion.div
                className="mt-4 p-3 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-lg border border-blue-200/30"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <p className="text-blue-800 font-medium italic">{message.verse}</p>
              </motion.div>
            )}
          </div>

          {/* Message Actions */}
          <div className={`flex items-center space-x-2 mt-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs text-gray-500">
              {format(message.timestamp, 'HH:mm')}
            </span>
            
            {!isUser && (
              <>
                <button
                  onClick={handleSpeak}
                  className="p-1 rounded hover:bg-white/20 transition-colors"
                  title="Read aloud"
                >
                  <Volume2 className="w-4 h-4 text-gray-500" />
                </button>
                
                <button
                  onClick={handleCopy}
                  className="p-1 rounded hover:bg-white/20 transition-colors"
                  title="Copy message"
                >
                  <Copy className="w-4 h-4 text-gray-500" />
                </button>
                
                <button
                  className="p-1 rounded hover:bg-white/20 transition-colors"
                  title="Share message"
                >
                  <Share className="w-4 h-4 text-gray-500" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};