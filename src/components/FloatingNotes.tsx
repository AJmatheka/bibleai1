import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Save, Edit3, Trash2, Tag } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  timestamp: Date;
}

interface FloatingNotesProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const FloatingNotes: React.FC<FloatingNotesProps> = ({ isOpen, onToggle }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: '' });

  const handleCreateNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      timestamp: new Date(),
    };

    setNotes(prev => [note, ...prev]);
    setNewNote({ title: '', content: '', tags: '' });
    setIsCreating(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg flex items-center justify-center z-50 floating-element"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <Plus className="w-6 h-6 text-white" />
      </motion.button>

      {/* Notes Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 max-h-96 glass-card z-40"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Quick Notes</h3>
                <button
                  onClick={() => setIsCreating(true)}
                  className="p-1 rounded hover:bg-white/20 transition-colors"
                >
                  <Edit3 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-80 overflow-y-auto">
              {/* Create Note Form */}
              <AnimatePresence>
                {isCreating && (
                  <motion.div
                    className="p-4 border-b border-white/20"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={newNote.title}
                        onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Note title..."
                        className="w-full glass rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      
                      <textarea
                        value={newNote.content}
                        onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Write your note..."
                        className="w-full glass rounded-lg px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        rows={3}
                      />
                      
                      <input
                        type="text"
                        value={newNote.tags}
                        onChange={(e) => setNewNote(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="Tags (comma separated)..."
                        className="w-full glass rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={handleCreateNote}
                          className="flex-1 glass-button bg-blue-500/20 text-blue-600 py-2 text-sm"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          Save
                        </button>
                        <button
                          onClick={() => setIsCreating(false)}
                          className="px-3 py-2 glass-button text-gray-600 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Notes List */}
              <div className="p-4">
                {notes.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <Edit3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No notes yet</p>
                    <p className="text-xs">Click the edit icon to create one</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notes.map((note, index) => (
                      <motion.div
                        key={note.id}
                        className="glass p-3 rounded-lg group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-800 text-sm truncate flex-1">
                            {note.title}
                          </h4>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100/50 text-red-500 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                          {note.content}
                        </p>
                        
                        {note.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {note.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100/50 text-blue-600"
                              >
                                <Tag className="w-2 h-2 mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-xs text-gray-400">
                          {note.timestamp.toLocaleDateString()}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};