import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Quote } from 'lucide-react';

interface Insight {
  theologian: string;
  commentary: string;
}

interface TheologianInsightsProps {
  insights: Insight[];
  verse?: string;
}

const theologianAvatars: Record<string, string> = {
  'C.S. Lewis': '🎓',
  'Charles Spurgeon': '⛪',
  'Martin Luther King Jr.': '✊',
  'Sam Shamoun': '📚',
};

export const TheologianInsights: React.FC<TheologianInsightsProps> = ({ insights, verse }) => {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  const toggleInsight = (theologian: string) => {
    setExpandedInsight(expandedInsight === theologian ? null : theologian);
  };

  return (
    <motion.div
      className="mt-4 space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="flex items-center space-x-2 mb-4">
        <Quote className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Theologian Insights</h3>
      </div>

      <div className="grid gap-3">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.theologian}
            className="glass-card overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <button
              onClick={() => toggleInsight(insight.theologian)}
              className="w-full p-4 flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {theologianAvatars[insight.theologian] || '👤'}
                </span>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-800">{insight.theologian}</h4>
                  <p className="text-sm text-gray-600">Biblical Scholar & Theologian</p>
                </div>
              </div>
              
              <motion.div
                animate={{ rotate: expandedInsight === insight.theologian ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedInsight === insight.theologian && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 border-t border-white/20">
                    <div className="pt-4">
                      <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-lg p-4 border border-blue-200/30">
                        <p className="text-gray-700 italic leading-relaxed">
                          "{insight.commentary}"
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};