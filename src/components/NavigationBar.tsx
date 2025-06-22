
import React from 'react';
import { BrainCircuit } from 'lucide-react';

const NavigationBar = () => {
  return (
    <div className="bg-slate-900/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
            <BrainCircuit className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">arXiv Intelligence</h1>
            <p className="text-xs text-gray-400">Research Analysis Platform</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
