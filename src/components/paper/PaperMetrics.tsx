
import React from 'react';
import { Zap, Clock, ShieldCheck } from 'lucide-react';

interface PaperMetricsProps {
  commercialViability?: string;
  timelineToMarket?: number;
  patentPotential?: string;
}

const PaperMetrics: React.FC<PaperMetricsProps> = ({
  commercialViability,
  timelineToMarket,
  patentPotential
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mt-3 pt-3 border-t border-white/10">
      <div className="flex items-center space-x-1" title="Commercial Viability">
        <Zap className="h-3.5 w-3.5 text-purple-400" />
        <span className="font-medium truncate">{commercialViability || 'N/A'}</span>
      </div>
      <div className="flex items-center space-x-1" title="Time to Market">
        <Clock className="h-3.5 w-3.5 text-blue-400" />
        <span className="font-medium">{timelineToMarket ? `${timelineToMarket} mo` : 'N/A'}</span>
      </div>
      <div className="flex items-center space-x-1" title="Patent Potential">
        <ShieldCheck className="h-3.5 w-3.5 text-green-400" />
        <span className="font-medium">{patentPotential || 'N/A'}</span>
      </div>
    </div>
  );
};

export default PaperMetrics;
