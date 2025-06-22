
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  TrendingUp, 
  Zap, 
  Calendar,
  Filter,
  Brain,
  Lightbulb
} from 'lucide-react';

const DiscoverScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'papers' | 'companies' | 'topics'>('papers');

  const trendingTopics = [
    { name: 'Quantum Computing', count: 147, trend: '+23%', color: 'bg-purple-500' },
    { name: 'AI Safety', count: 89, trend: '+45%', color: 'bg-blue-500' },
    { name: 'Gene Therapy', count: 134, trend: '+12%', color: 'bg-green-500' },
    { name: 'Battery Technology', count: 76, trend: '+34%', color: 'bg-orange-500' },
    { name: 'Neural Networks', count: 203, trend: '+18%', color: 'bg-red-500' },
    { name: 'CRISPR', count: 92, trend: '+56%', color: 'bg-teal-500' }
  ];

  const recentBreakthroughs = [
    {
      title: 'Revolutionary Quantum Error Correction Method',
      impact: 9.2,
      sector: 'Quantum Computing',
      companies: ['IBM', 'GOOGL'],
      timeAgo: '2 hours ago'
    },
    {
      title: 'Novel mRNA Delivery System for Cancer Treatment',
      impact: 8.7,
      sector: 'Biotechnology',
      companies: ['MRNA', 'PFE'],
      timeAgo: '5 hours ago'
    },
    {
      title: 'Breakthrough in Room-Temperature Superconductors',
      impact: 9.8,
      sector: 'Materials',
      companies: ['Multiple'],
      timeAgo: '1 day ago'
    }
  ];

  return (
    <div className="min-h-screen text-white p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Discover Research
        </h1>
        <p className="text-gray-400 text-sm">Explore cutting-edge papers and breakthroughs</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search papers, topics, or companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
          />
        </div>

        {/* Search Type Filters */}
        <div className="flex space-x-2">
          {[
            { key: 'papers', label: 'Papers', icon: Brain },
            { key: 'companies', label: 'Companies', icon: TrendingUp },
            { key: 'topics', label: 'Topics', icon: Lightbulb }
          ].map((type) => {
            const IconComponent = type.icon;
            return (
              <Button
                key={type.key}
                size="sm"
                variant={searchType === type.key ? "default" : "outline"}
                onClick={() => setSearchType(type.key as typeof searchType)}
                className={`${
                  searchType === type.key
                    ? 'bg-purple-500/20 text-purple-400 border-purple-400/30'
                    : 'bg-white/5 text-gray-400 border-white/10'
                }`}
              >
                <IconComponent className="h-3 w-3 mr-1" />
                {type.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Trending Topics</h2>
          <Button size="sm" variant="ghost" className="text-gray-400">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-lg p-3 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-3 h-3 rounded-full ${topic.color}`}></div>
                <Badge className="text-xs bg-green-500/20 text-green-400">
                  {topic.trend}
                </Badge>
              </div>
              <h3 className="font-medium text-white text-sm mb-1">{topic.name}</h3>
              <p className="text-xs text-gray-400">{topic.count} papers</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Breakthroughs */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Recent Breakthroughs</h2>
          <Button size="sm" variant="ghost" className="text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            Last 24h
          </Button>
        </div>

        <div className="space-y-3">
          {recentBreakthroughs.map((breakthrough, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-white text-sm leading-tight flex-1 pr-3">
                  {breakthrough.title}
                </h3>
                <div className="flex items-center space-x-1">
                  <Zap className="h-3 w-3 text-yellow-400" />
                  <span className="text-xs font-bold text-yellow-400">
                    {breakthrough.impact}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                    {breakthrough.sector}
                  </Badge>
                  <div className="flex space-x-1">
                    {breakthrough.companies.map((company, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs text-green-400 border-green-400/30">
                        {company}
                      </Badge>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-400">{breakthrough.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-16 flex flex-col items-center justify-center space-y-1 bg-white/5 border-white/10 hover:border-blue-400/50"
        >
          <TrendingUp className="h-5 w-5 text-blue-400" />
          <span className="text-xs">Market Impact</span>
        </Button>

        <Button
          variant="outline"
          className="h-16 flex flex-col items-center justify-center space-y-1 bg-white/5 border-white/10 hover:border-purple-400/50"
        >
          <Brain className="h-5 w-5 text-purple-400" />
          <span className="text-xs">AI Analysis</span>
        </Button>
      </div>
    </div>
  );
};

export default DiscoverScreen;
