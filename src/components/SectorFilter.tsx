
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SectorFilterProps {
  sectors: string[];
  selectedSector: string | null;
  onSectorChange: (sector: string | null) => void;
}

const SectorFilter: React.FC<SectorFilterProps> = ({ 
  sectors, 
  selectedSector, 
  onSectorChange 
}) => {
  const sectorIcons = {
    'Technology': '💻',
    'Healthcare': '🏥',
    'Energy': '⚡',
    'Materials': '🧪',
    'Finance': '💰',
    'Manufacturing': '🏭',
    'Transportation': '🚗',
    'Agriculture': '🌱',
    'Telecommunications': '📡',
    'Aerospace': '🚀'
  };

  return (
    <div className="flex space-x-2 overflow-x-auto">
      <Button
        size="sm"
        variant={selectedSector === null ? "default" : "outline"}
        onClick={() => onSectorChange(null)}
        className={`whitespace-nowrap ${
          selectedSector === null
            ? 'bg-blue-500/20 text-blue-400 border-blue-400/30'
            : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
        }`}
      >
        All Sectors
      </Button>
      
      {sectors.map((sector) => (
        <Button
          key={sector}
          size="sm"
          variant={selectedSector === sector ? "default" : "outline"}
          onClick={() => onSectorChange(sector)}
          className={`whitespace-nowrap ${
            selectedSector === sector
              ? 'bg-blue-500/20 text-blue-400 border-blue-400/30'
              : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
          }`}
        >
          <span className="mr-1">
            {sectorIcons[sector as keyof typeof sectorIcons] || '📊'}
          </span>
          {sector}
        </Button>
      ))}
    </div>
  );
};

export default SectorFilter;
