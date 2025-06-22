
import React from 'react';
import { TrendingUp, Zap, Target } from 'lucide-react';

interface ImpactMeterProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const ImpactMeter: React.FC<ImpactMeterProps> = ({ score, size = 'md' }) => {
  const getColor = (score: number) => {
    if (score >= 8) return { bg: 'bg-red-500', text: 'text-red-400', ring: 'ring-red-500' };
    if (score >= 6) return { bg: 'bg-orange-500', text: 'text-orange-400', ring: 'ring-orange-500' };
    if (score >= 4) return { bg: 'bg-yellow-500', text: 'text-yellow-400', ring: 'ring-yellow-500' };
    return { bg: 'bg-gray-500', text: 'text-gray-400', ring: 'ring-gray-500' };
  };

  const getIcon = (score: number) => {
    if (score >= 8) return Zap;
    if (score >= 6) return TrendingUp;
    return Target;
  };

  const color = getColor(score);
  const IconComponent = getIcon(score);
  
  const sizeClasses = {
    sm: { container: 'w-12 h-12', icon: 'h-3 w-3', text: 'text-xs', ring: 'ring-2' },
    md: { container: 'w-16 h-16', icon: 'h-4 w-4', text: 'text-sm', ring: 'ring-2' },
    lg: { container: 'w-20 h-20', icon: 'h-5 w-5', text: 'text-base', ring: 'ring-3' }
  };

  const classes = sizeClasses[size];
  const percentage = Math.min(score * 10, 100);

  return (
    <div className="flex flex-col items-center space-y-1">
      <div className={`${classes.container} relative flex items-center justify-center rounded-full ${color.ring} ring-opacity-20`}>
        {/* Background Circle */}
        <div className="absolute inset-0 rounded-full bg-white/5"></div>
        
        {/* Progress Circle */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-white/10"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${percentage * 2.51} 251.2`}
            className={color.text}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Icon */}
        <IconComponent className={`${classes.icon} ${color.text} z-10`} />
      </div>
      
      <div className={`${classes.text} font-bold ${color.text}`}>
        {score.toFixed(1)}
      </div>
    </div>
  );
};

export default ImpactMeter;
