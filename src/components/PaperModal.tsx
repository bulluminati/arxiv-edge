
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  X, 
  ExternalLink, 
  TrendingUp, 
  Building2, 
  Calendar,
  Brain,
  Lightbulb,
  AlertTriangle,
  Target,
  Bookmark,
  Bell,
  StickyNote,
  Save
} from 'lucide-react';
import ImpactMeter from './ImpactMeter';

interface PaperModalProps {
  paper: any;
  onClose: () => void;
}

const PaperModal: React.FC<PaperModalProps> = ({ paper, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'notes'>('overview');
  const [userNote, setUserNote] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const saveUserNote = () => {
    // Implementation for saving note
    console.log('Saving note:', userNote);
  };

  const setReminder = () => {
    // Implementation for setting reminder
    console.log('Setting reminder for:', reminderDate);
  };

  const keyInsights = paper.key_insights || [];
  const limitations = paper.limitations || [];
  const affectedCompanies = paper.affected_public_companies || [];
  const technicalAdvantages = paper.technical_advantages || [];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-slate-900 border-slate-700 text-white overflow-hidden">
        <DialogHeader className="border-b border-slate-700 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <DialogTitle className="text-lg font-semibold leading-tight mb-2">
                {paper.title}
              </DialogTitle>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(paper.published_date)}</span>
                </div>
                
                {paper.market_sector && (
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30">
                    {paper.market_sector}
                  </Badge>
                )}
                
                {paper.arxiv_id && (
                  <Badge variant="outline" className="text-gray-400">
                    arXiv:{paper.arxiv_id}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <ImpactMeter score={paper.impact_score || 0} size="lg" />
              <Button
                size="sm"
                variant="ghost"
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2 pt-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`${
                isBookmarked ? 'text-yellow-400 bg-yellow-400/20' : 'text-gray-400'
              }`}
            >
              <Bookmark className="h-4 w-4 mr-1" fill={isBookmarked ? 'currentColor' : 'none'} />
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            
            {paper.arxiv_url && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(paper.arxiv_url, '_blank')}
                className="border-slate-600 text-gray-300"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View Paper
              </Button>
            )}
          </div>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b border-slate-700 pt-4">
          {[
            { key: 'overview', label: 'Overview', icon: Brain },
            { key: 'analysis', label: 'AI Analysis', icon: Lightbulb },
            { key: 'notes', label: 'Notes & Reminders', icon: StickyNote }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex items-center space-x-2 px-3 py-2 border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-400 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Abstract */}
              <div>
                <h3 className="font-semibold text-white mb-2 flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-blue-400" />
                  Abstract
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {paper.abstract || 'No abstract available'}
                </p>
              </div>

              {/* Key Insights */}
              {keyInsights.length > 0 && (
                <div>
                  <h3 className="font-semibold text-white mb-3 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-yellow-400" />
                    Key Insights
                  </h3>
                  <div className="space-y-2">
                    {keyInsights.map((insight: string, index: number) => (
                      <div key={index} className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                        <p className="text-yellow-100 text-sm">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Affected Companies */}
              {affectedCompanies.length > 0 && (
                <div>
                  <h3 className="font-semibold text-white mb-3 flex items-center">
                    <Building2 className="h-4 w-4 mr-2 text-green-400" />
                    Affected Companies
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {affectedCompanies.map((company: any, index: number) => (
                      <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-green-200">{company.name}</div>
                            <div className="text-xs text-green-400">{company.ticker}</div>
                          </div>
                          <Badge className="bg-green-500/20 text-green-300">
                            {company.impact_type || 'Impact'}
                          </Badge>
                        </div>
                        {company.impact_description && (
                          <p className="text-xs text-green-100 mt-2">{company.impact_description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'analysis' && (
            <>
              {/* Technical Advantages */}
              {technicalAdvantages.length > 0 && (
                <div>
                  <h3 className="font-semibold text-white mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-blue-400" />
                    Technical Advantages
                  </h3>
                  <div className="space-y-2">
                    {technicalAdvantages.map((advantage: string, index: number) => (
                      <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                        <p className="text-blue-100 text-sm">{advantage}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Limitations */}
              {limitations.length > 0 && (
                <div>
                  <h3 className="font-semibold text-white mb-3 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-orange-400" />
                    Limitations & Challenges
                  </h3>
                  <div className="space-y-2">
                    {limitations.map((limitation: string, index: number) => (
                      <div key={index} className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                        <p className="text-orange-100 text-sm">{limitation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Commercial Viability */}
              {paper.commercial_viability && (
                <div>
                  <h3 className="font-semibold text-white mb-3 flex items-center">
                    <Target className="h-4 w-4 mr-2 text-purple-400" />
                    Commercial Viability
                  </h3>
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <p className="text-purple-100 text-sm">{paper.commercial_viability}</p>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'notes' && (
            <>
              {/* Personal Notes */}
              <div>
                <h3 className="font-semibold text-white mb-3 flex items-center">
                  <StickyNote className="h-4 w-4 mr-2 text-blue-400" />
                  Personal Notes
                </h3>
                <Textarea
                  placeholder="Add your notes about this paper..."
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 min-h-32"
                />
                <Button
                  onClick={saveUserNote}
                  className="mt-2 bg-blue-500/20 text-blue-400 border border-blue-400/30 hover:bg-blue-500/30"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Note
                </Button>
              </div>

              {/* Reminder */}
              <div>
                <h3 className="font-semibold text-white mb-3 flex items-center">
                  <Bell className="h-4 w-4 mr-2 text-green-400" />
                  Set Reminder
                </h3>
                <div className="flex space-x-2">
                  <Input
                    type="datetime-local"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                  <Button
                    onClick={setReminder}
                    className="bg-green-500/20 text-green-400 border border-green-400/30 hover:bg-green-500/30"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Set
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaperModal;
