
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
  // GICS 11 sectors with color coding
  const gicsSectors = [
    { name: 'Energy', color: 'bg-red-500/20 text-red-400 border-red-400/30', icon: '⚡' },
    { name: 'Materials', color: 'bg-orange-500/20 text-orange-400 border-orange-400/30', icon: '🧪' },
    { name: 'Industrials', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30', icon: '🏭' },
    { name: 'Consumer Discretionary', color: 'bg-lime-500/20 text-lime-400 border-lime-400/30', icon: '🛍️' },
    { name: 'Consumer Staples', color: 'bg-green-500/20 text-green-400 border-green-400/30', icon: '🛒' },
    { name: 'Health Care', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30', icon: '🏥' },
    { name: 'Financials', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-400/30', icon: '💰' },
    { name: 'Information Technology', color: 'bg-blue-500/20 text-blue-400 border-blue-400/30', icon: '💻' },
    { name: 'Communication Services', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-400/30', icon: '📡' },
    { name: 'Utilities', color: 'bg-purple-500/20 text-purple-400 border-purple-400/30', icon: '⚡' },
    { name: 'Real Estate', color: 'bg-pink-500/20 text-pink-400 border-pink-400/30', icon: '🏢' }
  ];

  // Map sectors to GICS with fallback for existing data
  const availableGicsSectors = gicsSectors.filter(gics => 
    sectors.some(sector => 
      sector.toLowerCase().includes(gics.name.toLowerCase()) || 
      gics.name.toLowerCase().includes(sector.toLowerCase())
    )
  );

  // Add any unmapped sectors
  const unmappedSectors = sectors.filter(sector => 
    !gicsSectors.some(gics => 
      sector.toLowerCase().includes(gics.name.toLowerCase()) || 
      gics.name.toLowerCase().includes(sector.toLowerCase())
    )
  );

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
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
      
      {availableGicsSectors.map((gics) => (
        <Button
          key={gics.name}
          size="sm"
          variant={selectedSector === gics.name ? "default" : "outline"}
          onClick={() => onSectorChange(gics.name)}
          className={`whitespace-nowrap ${
            selectedSector === gics.name
              ? gics.color
              : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
          }`}
        >
          <span className="mr-1">{gics.icon}</span>
          {gics.name}
        </Button>
      ))}

      {unmappedSectors.map((sector) => (
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
          📊 {sector}
        </Button>
      ))}
    </div>
  );
};

export default SectorFilter;
