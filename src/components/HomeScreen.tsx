
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TrendingUp, Zap, BrainCircuit, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PaperCard from './PaperCard';
import SectorFilter from './SectorFilter';
import LoadingSpinner from './LoadingSpinner';
import ImpactMeter from './ImpactMeter';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'impact' | 'date' | 'trending'>('impact');

  const { data: papers, isLoading, error } = useQuery({
    queryKey: ['research-papers', selectedSector, sortBy],
    queryFn: async () => {
      let query = supabase
        .from('research_papers')
        .select(`
          *,
          affected_public_companies
        `)
        .not('title', 'is', null)
        .not('abstract', 'is', null)
        .limit(20);

      if (selectedSector) {
        query = query.eq('market_sector', selectedSector);
      }

      if (sortBy === 'impact') {
        query = query.order('impact_score', { ascending: false, nullsLast: true });
      } else if (sortBy === 'date') {
        query = query.order('published_date', { ascending: false, nullsLast: true });
      } else if (sortBy === 'trending') {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

  const { data: sectors } = useQuery({
    queryKey: ['sectors'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('distinct_sectors');
      if (error) throw error;
      return data?.map((s: { market_sector: string }) => s.market_sector) || [];
    },
  });

  const filteredPapers = papers?.filter(paper =>
    paper.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.abstract?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const averageImpact = papers?.reduce((sum, p) => sum + (p.impact_score || 0), 0) / (papers?.length || 1);

  return (
    <div className="min-h-screen text-white p-4">
      {/* Header with Stats */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Research Intelligence
            </h1>
            <p className="text-gray-400 text-sm">AI-powered paper analysis & insights</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{papers?.length || 0}</div>
            <div className="text-xs text-gray-400">Papers Analyzed</div>
          </div>
        </div>

        {/* Impact Overview */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/10">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-xs text-gray-400">Avg Impact</span>
            </div>
            <div className="text-lg font-bold text-white">
              {averageImpact ? averageImpact.toFixed(1) : '0.0'}
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/10">
            <div className="flex items-center space-x-2 mb-1">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-xs text-gray-400">High Impact</span>
            </div>
            <div className="text-lg font-bold text-white">
              {papers?.filter(p => (p.impact_score || 0) > 7).length || 0}
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/10">
            <div className="flex items-center space-x-2 mb-1">
              <BrainCircuit className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-gray-400">AI Analyzed</span>
            </div>
            <div className="text-lg font-bold text-white">
              {papers?.filter(p => p.agent1_technical_analysis).length || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search papers, abstracts, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400"
          />
        </div>

        <div className="flex space-x-3 overflow-x-auto pb-2">
          <SectorFilter
            sectors={sectors || []}
            selectedSector={selectedSector}
            onSectorChange={setSelectedSector}
          />
        </div>

        {/* Sort Options */}
        <div className="flex space-x-2">
          {[
            { key: 'impact', label: 'Impact', icon: TrendingUp },
            { key: 'date', label: 'Latest', icon: Zap },
            { key: 'trending', label: 'Trending', icon: BrainCircuit }
          ].map((option) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.key}
                onClick={() => setSortBy(option.key as typeof sortBy)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-all ${
                  sortBy === option.key
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                <IconComponent className="h-3 w-3" />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Papers List */}
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-400">Error loading papers</p>
        </div>
      ) : filteredPapers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">No papers found matching your criteria</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPapers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
