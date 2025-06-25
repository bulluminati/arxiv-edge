
import React from 'react';

interface PillProps {
  children: React.ReactNode;
  className?: string;
}

export const Pill: React.FC<PillProps> = ({ children, className = '' }) => (
  <div className={`bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-gray-200 ${className}`}>
    {children}
  </div>
);
