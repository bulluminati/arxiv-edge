
import React from 'react';

interface InfoBlockProps {
  title: string;
  content: React.ReactNode;
  icon: React.ElementType;
  colorClass?: string;
}

export const InfoBlock: React.FC<InfoBlockProps> = ({ 
  title, 
  content, 
  icon: Icon, 
  colorClass = 'text-blue-400' 
}) => (
  <div>
    <h3 className={`font-semibold text-white mb-3 flex items-center text-base`}>
      <Icon className={`h-5 w-5 mr-2 ${colorClass}`} />
      {title}
    </h3>
    <div className="text-gray-300 text-sm leading-relaxed space-y-2">{content}</div>
  </div>
);
