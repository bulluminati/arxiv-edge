import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { 
  User, 
  Building2, 
  Bell, 
  Settings, 
  TrendingUp,
  Bookmark,
  Brain,
  Zap,
  Plus,
  X,
  Search,
  BookOpen,
} from 'lucide-react';
import { GICS_SECTORS } from '@/utils/gicsUtils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import PaperCard from './PaperCard';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { User as AuthUser } from '@supabase/supabase-js';

const ProfileScreen = () => {
  const queryClient = useQueryClient();
  
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user;
    }
  });

  const { data: portfolio, isLoading: isLoadingPortfolio } = useQuery({
    queryKey: ['userPortfolio', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('user_portfolios')
        .select('*')
        .eq('user_id', user.id)
        .eq('portfolio_type', 'research')
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116: "exact-one" violation (0 rows)
        throw error;
      }
      return data;
    },
    enabled: !!user,
  });

  const upsertPortfolioMutation = useMutation({
    mutationFn: async (sectorsToUpdate?: string[]) => {
      if (!user?.id) return;

      const updates = {
        user_id: user.id,
        portfolio_type: 'research',
        name: `${user.email?.split('@')[0]}'s Research`,
        tracked_sectors: sectorsToUpdate || trackedSectors,
        updated_at: new Date().toISOString(),
      };

      // If portfolio exists, update it. Otherwise, create it.
      const { error } = await supabase
        .from('user_portfolios')
        .upsert(portfolio ? { ...updates, id: portfolio.id } : updates, {
          onConflict: 'id',
        });
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPortfolio', user?.id] });
    },
  });

  const [trackedSectors, setTrackedSectors] = useState<string[]>([]);
  
  useEffect(() => {
    if (user && !portfolio && !isLoadingPortfolio) {
      // User is loaded, but has no portfolio, and we are not currently loading.
      // Create a default portfolio for them.
      upsertPortfolioMutation.mutate([
        'Information Technology',
        'Health Care',
        'Financials'
      ]);
    } else if (portfolio?.tracked_sectors) {
      // Portfolio exists, sync its sectors to the local state.
      setTrackedSectors(portfolio.tracked_sectors);
    }
  }, [user, portfolio, isLoadingPortfolio, upsertPortfolioMutation]);

  useEffect(() => {
    if (portfolio && JSON.stringify(trackedSectors) !== JSON.stringify(portfolio.tracked_sectors)) {
      upsertPortfolioMutation.mutate(trackedSectors);
    }
  }, [trackedSectors, portfolio, upsertPortfolioMutation]);

  const [sectorSearch, setSectorSearch] = useState('');

  const filteredGicsSectors = useMemo(() => {
    if (!sectorSearch) return GICS_SECTORS;
    return GICS_SECTORS.filter(sector =>
      sector.name.toLowerCase().includes(sectorSearch.toLowerCase())
    );
  }, [sectorSearch]);

  const userStats = {
    papersAnalyzed: 1247,
    bookmarkedPapers: 89,
    alertsReceived: 156,
    avgImpactScore: 6.8
  };

  const addSector = (sectorName: string) => {
    if (sectorName && !trackedSectors.includes(sectorName)) {
      setTrackedSectors(prevSectors => [...prevSectors, sectorName]);
    }
    setSectorSearch('');
  };

  const removeSector = (sector: string) => {
    setTrackedSectors(trackedSectors.filter(s => s !== sector));
  };

  if (isLoadingPortfolio) {
    return <div className="min-h-screen text-white p-4">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Research Profile
          </h1>
          <p className="text-gray-400 text-sm">Customize your research intelligence</p>
        </div>
        <Button size="sm" variant="ghost" className="text-gray-400">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-lg p-3 border border-white/10">
          <div className="flex items-center space-x-2 mb-1">
            <Brain className="h-4 w-4 text-blue-400" />
            <span className="text-xs text-gray-400">Papers Analyzed</span>
          </div>
          <div className="text-lg font-bold text-white">{userStats.papersAnalyzed.toLocaleString()}</div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-lg p-3 border border-white/10">
          <div className="flex items-center space-x-2 mb-1">
            <Bookmark className="h-4 w-4 text-yellow-400" />
            <span className="text-xs text-gray-400">Bookmarked</span>
          </div>
          <div className="text-lg font-bold text-white">{userStats.bookmarkedPapers}</div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-lg p-3 border border-white/10">
          <div className="flex items-center space-x-2 mb-1">
            <Bell className="h-4 w-4 text-green-400" />
            <span className="text-xs text-gray-400">Alerts Received</span>
          </div>
          <div className="text-lg font-bold text-white">{userStats.alertsReceived}</div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-lg p-3 border border-white/10">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="h-4 w-4 text-orange-400" />
            <span className="text-xs text-gray-400">Avg Impact</span>
          </div>
          <div className="text-lg font-bold text-white">{userStats.avgImpactScore}</div>
        </div>
      </div>

      {/* Tracked Sectors */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
          <Building2 className="h-5 w-5 mr-2 text-blue-400" />
          Tracked Sectors
        </h2>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-lg p-4 border border-white/10">
          <div className="flex flex-wrap gap-2 mb-3">
            {trackedSectors.map((sector) => (
              <Badge
                key={sector}
                className="bg-blue-500/20 text-blue-400 border-blue-400/30 flex items-center space-x-1"
              >
                <span>{sector}</span>
                <button
                  onClick={() => removeSector(sector)}
                  className="ml-1 hover:text-red-400"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start bg-white/10 border-white/20 text-white placeholder-gray-400">
                <Plus className="mr-2 h-4 w-4" />
                Add new sector...
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Command>
                <CommandInput 
                  placeholder="Search sectors..." 
                  value={sectorSearch} 
                  onValueChange={setSectorSearch} 
                />
                <CommandList>
                  <CommandEmpty>No sectors found.</CommandEmpty>
                  <CommandGroup>
                    {filteredGicsSectors.map((sector) => (
                      <CommandItem
                        key={sector.name}
                        onSelect={() => addSector(sector.name)}
                        className="flex items-center space-x-2"
                      >
                        {sector.icon}
                        <span>{sector.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Alert Preferences */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-red-400" />
          Alert Preferences
        </h2>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-lg p-4 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">High Impact Alerts</h4>
              <p className="text-xs text-gray-400">Papers with impact score ≥ 8.0</p>
            </div>
            <Switch id="high-impact-alerts" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Sector Breakthroughs</h4>
              <p className="text-xs text-gray-400">Major discoveries in tracked sectors</p>
            </div>
            <Switch id="sector-breakthroughs" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Daily Digest</h4>
              <p className="text-xs text-gray-400">Summary of new papers and insights</p>
            </div>
            <Switch id="daily-digest" />
          </div>
        </div>
      </div>
      
      {/* Bookmarked Papers */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
          <Bookmark className="h-5 w-5 mr-2 text-yellow-400" />
          Bookmarked Papers
        </h2>
        <div className="space-y-4">
          {/* This would be populated with real data. Using placeholders. */}
           <PaperCard paper={{
            id: 'placeholder-2',
            title: 'Breakthrough in Quantum-Resistant Cryptography',
            abstract: 'A new cryptographic algorithm shows resilience against quantum computing attacks, with major implications for cybersecurity.',
            published_date: new Date(Date.now() - 86400000 * 2).toISOString(),
            impact_score: 9.1,
            market_sector: 'Cybersecurity',
            affected_public_companies: [{ ticker: 'CRWD' }, { ticker: 'PANW' }],
            key_insights: ['Establishes a new standard for post-quantum security.'],
            commercial_viability: 'Very High',
            timeline_to_market: 24,
            patent_potential: 'High'
          }} />
           <PaperCard paper={{
            id: 'placeholder-3',
            title: 'Novel Gene-Editing Technique Increases Precision by 99%',
            abstract: 'The study presents a new CRISPR-based technique that dramatically reduces off-target mutations, a major step for gene therapy.',
            published_date: new Date(Date.now() - 86400000 * 5).toISOString(),
            impact_score: 8.8,
            market_sector: 'Biotechnology',
            affected_public_companies: [{ ticker: 'CRSP' }, { ticker: 'EDIT' }],
            key_insights: ['Reduces risk of unintended genetic alterations in therapeutic applications.'],
            commercial_viability: 'High',
            timeline_to_market: 36,
            patent_potential: 'Medium'
          }} />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
        <Button variant="outline" className="bg-white/5 border-white/10">
          <Zap className="h-4 w-4 mr-2" />
          Export Data
        </Button>
        <Button variant="outline" className="bg-white/5 border-white/10">
          <Settings className="h-4 w-4 mr-2" />
          Advanced Settings
        </Button>
      </div>
    </div>
  );
};

export default ProfileScreen;
