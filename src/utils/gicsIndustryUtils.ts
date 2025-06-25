
import { GICSSector } from '@/types/gics';

export function getIndustryGroupForSector(gics: GICSSector, industryName: string): string | null {
  return gics.industryGroups.find(group =>
    industryName.toLowerCase().includes(group.toLowerCase()) ||
    group.toLowerCase().includes(industryName.toLowerCase())
  ) || null;
}
