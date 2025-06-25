
import React from 'react';
import { Brain, Lightbulb, TrendingUp, FlaskConical } from 'lucide-react';
import { InfoBlock } from '@/components/ui/info-block';

interface OverviewTabProps {
  summary?: string;
  eli16Summary?: string;
  keyInsights?: string[];
  breakthroughClaims?: string[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  summary,
  eli16Summary,
  keyInsights = [],
  breakthroughClaims = []
}) => {
  return (
    <div className="space-y-8 py-2">
      <InfoBlock
        title="Summary"
        icon={Brain}
        colorClass="text-blue-400"
        content={<p>{summary || 'No summary available.'}</p>}
      />
      
      <InfoBlock
        title="ELI16 Summary"
        icon={Lightbulb}
        colorClass="text-yellow-400"
        content={<p>{eli16Summary || 'No simplified summary available.'}</p>}
      />
      
      {keyInsights.length > 0 && (
        <InfoBlock
          title="Key Insights"
          icon={TrendingUp}
          colorClass="text-green-400"
          content={
            <ul className="list-disc list-inside space-y-2">
              {keyInsights.map((insight: string, index: number) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          }
        />
      )}
      
      {breakthroughClaims.length > 0 && (
        <InfoBlock
          title="Breakthrough Claims"
          icon={FlaskConical}
          colorClass="text-purple-400"
          content={
            <ul className="list-disc list-inside space-y-2">
              {breakthroughClaims.map((claim: string, index: number) => (
                <li key={index}>{claim}</li>
              ))}
            </ul>
          }
        />
      )}
    </div>
  );
};

export default OverviewTab;
