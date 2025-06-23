
export interface GICSSector {
  name: string;
  color: string;
  textColor: string;
  borderColor: string;
  icon: string;
  industryGroups: string[];
  description: string;
}

export const GICS_SECTORS: GICSSector[] = [
  { 
    name: 'Energy', 
    color: 'bg-red-500/20', 
    textColor: 'text-red-400', 
    borderColor: 'border-red-400/30',
    icon: '⚡',
    description: 'Oil, gas, consumable fuels, energy equipment & services',
    industryGroups: [
      'Oil, Gas & Consumable Fuels',
      'Energy Equipment & Services'
    ]
  },
  { 
    name: 'Materials', 
    color: 'bg-orange-500/20', 
    textColor: 'text-orange-400', 
    borderColor: 'border-orange-400/30',
    icon: '🏗️',
    description: 'Chemicals, construction materials, containers & packaging, metals & mining, paper & forest products',
    industryGroups: [
      'Chemicals',
      'Construction Materials', 
      'Containers & Packaging',
      'Metals & Mining',
      'Paper & Forest Products'
    ]
  },
  { 
    name: 'Industrials', 
    color: 'bg-yellow-500/20', 
    textColor: 'text-yellow-400', 
    borderColor: 'border-yellow-400/30',
    icon: '🏭',
    description: 'Aerospace & defense, building products, construction & engineering, electrical equipment, industrial conglomerates, machinery, commercial services & supplies, professional services, air freight & logistics, airlines, marine, road & rail, transportation infrastructure',
    industryGroups: [
      'Aerospace & Defense',
      'Building Products',
      'Construction & Engineering',
      'Electrical Equipment',
      'Industrial Conglomerates',
      'Machinery',
      'Commercial Services & Supplies',
      'Professional Services',
      'Air Freight & Logistics',
      'Airlines',
      'Marine',
      'Road & Rail',
      'Transportation Infrastructure'
    ]
  },
  { 
    name: 'Consumer Discretionary', 
    color: 'bg-lime-500/20', 
    textColor: 'text-lime-400', 
    borderColor: 'border-lime-400/30',
    icon: '🛍️',
    description: 'Automobiles, consumer durables, apparel, hotels & restaurants, media, retail, leisure products',
    industryGroups: [
      'Automobiles',
      'Consumer Durables',
      'Apparel',
      'Hotels & Restaurants',
      'Media',
      'Retail',
      'Leisure Products'
    ]
  },
  { 
    name: 'Consumer Staples', 
    color: 'bg-green-500/20', 
    textColor: 'text-green-400', 
    borderColor: 'border-green-400/30',
    icon: '🛒',
    description: 'Food & staples retailing, beverages, food products, tobacco, household & personal products',
    industryGroups: [
      'Food & Staples Retailing',
      'Beverages',
      'Food Products',
      'Tobacco',
      'Household & Personal Products'
    ]
  },
  { 
    name: 'Health Care', 
    color: 'bg-emerald-500/20', 
    textColor: 'text-emerald-400', 
    borderColor: 'border-emerald-400/30',
    icon: '🏥',
    description: 'Health care equipment & supplies, health care providers & services, health care technology, biotechnology, pharmaceuticals',
    industryGroups: [
      'Health Care Equipment & Supplies',
      'Health Care Providers & Services',
      'Health Care Technology',
      'Biotechnology',
      'Pharmaceuticals'
    ]
  },
  { 
    name: 'Financials', 
    color: 'bg-cyan-500/20', 
    textColor: 'text-cyan-400', 
    borderColor: 'border-cyan-400/30',
    icon: '💰',
    description: 'Banks, diversified financials, insurance, real estate',
    industryGroups: [
      'Banks',
      'Diversified Financials',
      'Insurance',
      'Real Estate'
    ]
  },
  { 
    name: 'Information Technology', 
    color: 'bg-blue-500/20', 
    textColor: 'text-blue-400', 
    borderColor: 'border-blue-400/30',
    icon: '💻',
    description: 'Software & services, technology hardware & equipment, semiconductors & semiconductor equipment',
    industryGroups: [
      'Software & Services',
      'Technology Hardware & Equipment',
      'Semiconductors & Semiconductor Equipment'
    ]
  },
  { 
    name: 'Communication Services', 
    color: 'bg-indigo-500/20', 
    textColor: 'text-indigo-400', 
    borderColor: 'border-indigo-400/30',
    icon: '📡',
    description: 'Diversified telecommunication services, wireless telecommunication services, media & entertainment, interactive media & services',
    industryGroups: [
      'Diversified Telecommunication Services',
      'Wireless Telecommunication Services',
      'Media & Entertainment',
      'Interactive Media & Services'
    ]
  },
  { 
    name: 'Utilities', 
    color: 'bg-purple-500/20', 
    textColor: 'text-purple-400', 
    borderColor: 'border-purple-400/30',
    icon: '⚡',
    description: 'Electric utilities, gas utilities, multi-utilities, water utilities, independent power & renewable electricity producers',
    industryGroups: [
      'Electric Utilities',
      'Gas Utilities',
      'Multi-Utilities',
      'Water Utilities',
      'Independent Power & Renewable Electricity Producers'
    ]
  },
  { 
    name: 'Real Estate', 
    color: 'bg-pink-500/20', 
    textColor: 'text-pink-400', 
    borderColor: 'border-pink-400/30',
    icon: '🏢',
    description: 'Equity real estate investment trusts (REITs), real estate management & development',
    industryGroups: [
      'Equity Real Estate Investment Trusts (REITs)',
      'Real Estate Management & Development'
    ]
  }
];

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

export function getIndustryGroupForSector(sics: GICSSector, industryName: string): string | null {
  return gics.industryGroups.find(group =>
    industryName.toLowerCase().includes(group.toLowerCase()) ||
    group.toLowerCase().includes(industryName.toLowerCase())
  ) || null;
}
