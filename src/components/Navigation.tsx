import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { 
  Book, 
  History, 
  Users, 
  Bell, 
  Bookmark, 
  User, 
  Settings, 
  LogOut,
  Heart
} from 'lucide-react';
import toast from 'react-hot-toast';

interface NavigationProps {
  onHistoryToggle: () => void;
  isHistoryOpen: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ onHistoryToggle, isHistoryOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications] = useState(3); // Mock notification count
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="glass-card px-6 py-4 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Book className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold gradient-text">Bible AI</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* Study Rooms */}
            <Link
              to="/study-rooms"
              className="glass-button p-3 relative group"
              title="Study Rooms"
            >
              <Users className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
            </Link>

            {/* Devotionals */}
            <Link
              to="/devotionals"
              className="glass-button p-3 relative group"
              title="Daily Devotionals"
            >
              <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
            </Link>

            {/* History */}
            <button
              onClick={onHistoryToggle}
              className={`glass-button p-3 relative group ${
                isHistoryOpen ? 'bg-blue-500/20 text-blue-600' : ''
              }`}
              title="Chat History"
            >
              <History className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="glass-button p-3 relative group" title="Notifications">
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-yellow-600" />
              {notifications > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {notifications}
                </motion.span>
              )}
            </button>

            {/* Bookmarks */}
            <Link
              to="/notes"
              className="glass-button p-3 relative group"
              title="Notes & Bookmarks"
            >
              <Bookmark className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
            </Link>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="glass-button p-3 flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {currentUser?.displayName?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
                  </span>
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <motion.div
                  className="absolute right-0 top-full mt-2 w-64 glass-card p-4"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* User Info */}
                  <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-white/20">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {currentUser?.displayName?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {currentUser?.displayName || 'User'}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {currentUser?.email}
                      </p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/20 transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <User className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700">Profile</span>
                    </Link>
                    
                    <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/20 transition-colors w-full text-left">
                      <Settings className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700">Settings</span>
                    </button>
                    
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-red-100/50 transition-colors w-full text-left text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};