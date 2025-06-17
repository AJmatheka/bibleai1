import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, Volume2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { TheologianInsights } from './TheologianInsights';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  verse?: string;
  insights?: {
    theologian: string;
    commentary: string;
  }[];
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response with theologian insights
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Here's what I found about "${inputValue}". This relates to several biblical principles and teachings.`,
        timestamp: new Date(),
        verse: 'John 3:16 - "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."',
        insights: [
          {
            theologian: 'C.S. Lewis',
            commentary: 'The profound nature of divine love is not merely emotional but sacrificial. This verse encapsulates the entire gospel message in its essence.',
          },
          {
            theologian: 'Charles Spurgeon',
            commentary: 'Here we see the breadth of God\'s love - "the world" - and the depth of His sacrifice. No greater love has ever been demonstrated.',
          },
          {
            theologian: 'Martin Luther King Jr.',
            commentary: 'This verse reminds us that God\'s love transcends all boundaries and calls us to love without discrimination or prejudice.',
          },
        ],
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input implementation would go here
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Messages Container */}
      <motion.div
        className="glass-card p-6 mb-6 min-h-[500px] max-h-[600px] overflow-y-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Your Bible Study</h3>
              <p>Ask questions about verses, seek spiritual guidance, or explore biblical themes</p>
            </motion.div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id}>
                <ChatMessage message={message} />
                {message.insights && (
                  <TheologianInsights insights={message.insights} verse={message.verse} />
                )}
              </div>
            ))}
            {isLoading && (
              <motion.div
                className="flex items-center space-x-2 text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex space-x-1">
                  <motion.div
                    className="w-2 h-2 bg-blue-500 rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-blue-500 rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-blue-500 rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
                <span>AI is thinking...</span>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </motion.div>

      {/* Input Area */}
      <motion.div
        className="glass-card p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about a verse, seek guidance, or explore biblical themes..."
              className="w-full glass border-0 rounded-xl p-4 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={3}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex flex-col space-y-2">
            <motion.button
              onClick={toggleVoiceInput}
              className={`glass-button p-3 ${
                isListening ? 'bg-red-500/20 text-red-600 animate-wave' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Voice Input"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </motion.button>
            
            <motion.button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="glass-button bg-blue-500/20 text-blue-600 p-3 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Send Message"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};