import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card p-8">
        <motion.div
          className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-gray-600 mt-4 text-center">Loading...</p>
      </div>
    </div>
  );
};