
export interface GICSSector {
  name: string;
  color: string;
  textColor: string;
  borderColor: string;
  icon: string;
}

export const GICS_SECTORS: GICSSector[] = [
  { 
    name: 'Energy', 
    color: 'bg-red-500/20', 
    textColor: 'text-red-400', 
    borderColor: 'border-red-400/30',
    icon: '⚡' 
  },
  { 
    name: 'Materials', 
    color: 'bg-orange-500/20', 
    textColor: 'text-orange-400', 
    borderColor: 'border-orange-400/30',
    icon: '🧪' 
  },
  { 
    name: 'Industrials', 
    color: 'bg-yellow-500/20', 
    textColor: 'text-yellow-400', 
    borderColor: 'border-yellow-400/30',
    icon: '🏭' 
  },
  { 
    name: 'Consumer Discretionary', 
    color: 'bg-lime-500/20', 
    textColor: 'text-lime-400', 
    borderColor: 'border-lime-400/30',
    icon: '🛍️' 
  },
  { 
    name: 'Consumer Staples', 
    color: 'bg-green-500/20', 
    textColor: 'text-green-400', 
    borderColor: 'border-green-400/30',
    icon: '🛒' 
  },
  { 
    name: 'Health Care', 
    color: 'bg-emerald-500/20', 
    textColor: 'text-emerald-400', 
    borderColor: 'border-emerald-400/30',
    icon: '🏥' 
  },
  { 
    name: 'Financials', 
    color: 'bg-cyan-500/20', 
    textColor: 'text-cyan-400', 
    borderColor: 'border-cyan-400/30',
    icon: '💰' 
  },
  { 
    name: 'Information Technology', 
    color: 'bg-blue-500/20', 
    textColor: 'text-blue-400', 
    borderColor: 'border-blue-400/30',
    icon: '💻' 
  },
  { 
    name: 'Communication Services', 
    color: 'bg-indigo-500/20', 
    textColor: 'text-indigo-400', 
    borderColor: 'border-indigo-400/30',
    icon: '📡' 
  },
  { 
    name: 'Utilities', 
    color: 'bg-purple-500/20', 
    textColor: 'text-purple-400', 
    borderColor: 'border-purple-400/30',
    icon: '⚡' 
  },
  { 
    name: 'Real Estate', 
    color: 'bg-pink-500/20', 
    textColor: 'text-pink-400', 
    borderColor: 'border-pink-400/30',
    icon: '🏢' 
  }
];

export function getGICSSector(sectorName: string): GICSSector | null {
  return GICS_SECTORS.find(gics => 
    sectorName.toLowerCase().includes(gics.name.toLowerCase()) || 
    gics.name.toLowerCase().includes(sectorName.toLowerCase())
  ) || null;
}

export function mapToGICSSector(sectorName: string): string {
  const gics = getGICSSector(sectorName);
  return gics ? gics.name : sectorName;
}
