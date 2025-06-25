
// Re-export all GICS utilities from their respective modules for backward compatibility
export type { GICSSector } from '@/types/gics';
export { GICS_SECTORS } from '@/data/gicsSectors';
export { getGICSSector, mapToGICSSector } from '@/utils/gicsSectorLookup';
export { getIndustryGroupForSector } from '@/utils/gicsIndustryUtils';
