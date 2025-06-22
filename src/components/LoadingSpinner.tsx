
import React from 'react';
import { BrainCircuit } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <BrainCircuit className="h-6 w-6 text-blue-400" />
        </div>
      </div>
      <p className="text-gray-400 text-sm mt-4">Analyzing research papers...</p>
    </div>
  );
};

export default LoadingSpinner;
