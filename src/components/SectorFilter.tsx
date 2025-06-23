
import React from 'react';
import { Button } from '@/components/ui/button';
import { GICS_SECTORS, getGICSSector } from '@/utils/gicsUtils';

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
  // Map sectors to GICS with fallback for existing data
  const availableGicsSectors = GICS_SECTORS.filter(gics => 
    sectors.some(sector => 
      sector.toLowerCase().includes(gics.name.toLowerCase()) || 
      gics.name.toLowerCase().includes(sector.toLowerCase())
    )
  );

  // Add any unmapped sectors
  const unmappedSectors = sectors.filter(sector => 
    !GICS_SECTORS.some(gics => 
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
          title={gics.description}
          className={`whitespace-nowrap transition-all duration-200 ${
            selectedSector === gics.name
              ? `${gics.color} ${gics.textColor} ${gics.borderColor}`
              : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
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
