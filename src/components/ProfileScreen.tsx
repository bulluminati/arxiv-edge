
import React, { useState } from 'react';
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
  X
} from 'lucide-react';

const ProfileScreen = () => {
  const [trackedSectors, setTrackedSectors] = useState([
    'Quantum Computing',
    'Biotechnology',
    'AI & Machine Learning',
    'Energy Storage'
  ]);
  
  const [trackedCompanies, setTrackedCompanies] = useState([
    'NVDA', 'TSLA', 'MRNA', 'IBM', 'GOOGL'
  ]);

  const [newSector, setNewSector] = useState('');
  const [newCompany, setNewCompany] = useState('');

  const availableSectors = [
    'Quantum Computing',
    'Biotechnology',
    'AI & Machine Learning',
    'Nanotechnology',
    'Renewable Energy',
    'Aerospace',
    'Robotics',
    'Materials Science',
    'Telecommunications',
    'Pharmaceuticals'
  ];

  const userStats = {
    papersAnalyzed: 1247,
    bookmarkedPapers: 89,
    alertsReceived: 156,
    avgImpactScore: 6.8
  };

  const addSector = () => {
    if (newSector && !trackedSectors.includes(newSector)) {
      setTrackedSectors([...trackedSectors, newSector]);
      setNewSector('');
    }
  };

  const removeSector = (sector: string) => {
    setTrackedSectors(trackedSectors.filter(s => s !== sector));
  };

  const addCompany = () => {
    if (newCompany && !trackedCompanies.includes(newCompany.toUpperCase())) {
      setTrackedCompanies([...trackedCompanies, newCompany.toUpperCase()]);
      setNewCompany('');
    }
  };

  const removeCompany = (company: string) => {
    setTrackedCompanies(trackedCompanies.filter(c => c !== company));
  };

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
          
          <div className="flex space-x-2">
            <Input
              placeholder="Add new sector..."
              value={newSector}
              onChange={(e) => setNewSector(e.target.value)}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400"
              list="sectors"
            />
            <datalist id="sectors">
              {availableSectors.map((sector) => (
                <option key={sector} value={sector} />
              ))}
            </datalist>
            <Button onClick={addSector} size="sm" className="bg-blue-500/20 text-blue-400 border border-blue-400/30">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tracked Companies */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
          Tracked Companies
        </h2>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-lg p-4 border border-white/10">
          <div className="flex flex-wrap gap-2 mb-3">
            {trackedCompanies.map((company) => (
              <Badge
                key={company}
                className="bg-green-500/20 text-green-400 border-green-400/30 flex items-center space-x-1"
              >
                <span>{company}</span>
                <button
                  onClick={() => removeCompany(company)}
                  className="ml-1 hover:text-red-400"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Input
              placeholder="Add ticker symbol (e.g., AAPL)..."
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value.toUpperCase())}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
            <Button onClick={addCompany} size="sm" className="bg-green-500/20 text-green-400 border border-green-400/30">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-orange-400" />
          Alert Preferences
        </h2>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-lg p-4 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">High Impact Alerts</div>
              <div className="text-xs text-gray-400">Papers with impact score ≥ 8.0</div>
            </div>
            <Switch checked={true} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Sector Breakthroughs</div>
              <div className="text-xs text-gray-400">Major discoveries in tracked sectors</div>
            </div>
            <Switch checked={true} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Company Impact</div>
              <div className="text-xs text-gray-400">Research affecting tracked companies</div>
            </div>
            <Switch checked={false} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Daily Digest</div>
              <div className="text-xs text-gray-400">Summary of new papers and insights</div>
            </div>
            <Switch checked={true} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-16 flex flex-col items-center justify-center space-y-1 bg-white/5 border-white/10 hover:border-purple-400/50"
        >
          <Zap className="h-5 w-5 text-purple-400" />
          <span className="text-xs">Export Data</span>
        </Button>

        <Button
          variant="outline"
          className="h-16 flex flex-col items-center justify-center space-y-1 bg-white/5 border-white/10 hover:border-red-400/50"
        >
          <Settings className="h-5 w-5 text-red-400" />
          <span className="text-xs">Advanced Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default ProfileScreen;
