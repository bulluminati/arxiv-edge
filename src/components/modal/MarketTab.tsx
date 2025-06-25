import React from 'react';
import { TrendingUp, Scale, Building2 } from 'lucide-react';
import { InfoBlock } from '@/components/ui/info-block';
import { Pill } from '@/components/ui/pill';
import { formatCurrency } from '@/utils/formatUtils';

interface MarketTabProps {
  commercialViability?: string;
  marketSizeEstimate?: number;
  timelineToMarket?: number;
  marketAnalysis?: any;
  affectedCompanies?: any[];
}

const MarketTab: React.FC<MarketTabProps> = ({
  commercialViability,
  marketSizeEstimate,
  timelineToMarket,
  marketAnalysis = {},
  affectedCompanies = []
}) => {
  return (
    <div className="space-y-8 py-2">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
          <h4 className="text-xs text-gray-400 mb-1">Commercial Viability</h4>
          <p className="text-base font-semibold text-white">{commercialViability || 'N/A'}</p>
        </div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
          <h4 className="text-xs text-gray-400 mb-1">Market Size (est.)</h4>
          <p className="text-base font-semibold text-white">{formatCurrency(marketSizeEstimate)}</p>
        </div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
          <h4 className="text-xs text-gray-400 mb-1">Time to Market (est.)</h4>
          <p className="text-base font-semibold text-white">{timelineToMarket ? `${timelineToMarket} months` : 'N/A'}</p>
        </div>
      </div>
      
      {marketAnalysis.market_opportunities && (
        <InfoBlock
          title="Market Opportunities"
          icon={TrendingUp}
          colorClass="text-green-400"
          content={
            <ul className="list-disc list-inside space-y-2">
              {marketAnalysis.market_opportunities.map((opp: string, i: number) => <li key={i}>{opp}</li>)}
            </ul>
          }
        />
      )}
      
      {marketAnalysis.competitive_landscape && (
        <InfoBlock
          title="Competitive Landscape"
          icon={Scale}
          colorClass="text-orange-400"
          content={<p>{marketAnalysis.competitive_landscape}</p>}
        />
      )}
      
      {affectedCompanies.length > 0 && (
        <InfoBlock
          title="Affected Companies"
          icon={Building2}
          colorClass="text-blue-400"
          content={
            <div className="flex flex-wrap gap-2">
              {affectedCompanies.map((company: any, index: number) => (
                <Pill key={index}>{company.ticker || company.name}</Pill>
              ))}
            </div>
          }
        />
      )}
    </div>
  );
};

export default MarketTab;
