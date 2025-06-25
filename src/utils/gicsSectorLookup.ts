
import { GICS_SECTORS } from '@/data/gicsSectors';
import { GICSSector } from '@/types/gics';

export function getGICSSector(sectorName: string): GICSSector | null {
  return GICS_SECTORS.find(gics => 
    sectorName.toLowerCase().includes(gics.name.toLowerCase()) || 
    gics.name.toLowerCase().includes(sectorName.toLowerCase()) ||
    gics.industryGroups.some(group => 
      sectorName.toLowerCase().includes(group.toLowerCase()) ||
      group.toLowerCase().includes(sectorName.toLowerCase())
    )
  ) || null;
}

export function mapToGICSSector(sectorName: string): string {
  const gics = getGICSSector(sectorName);
  return gics ? gics.name : sectorName;
}
