import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Sheet, SheetContent } from '@/components/ui/sheet';
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
  Save,
  DollarSign,
  Cpu,
  ShieldCheck,
  BookText,
  Clock,
  Briefcase,
  FlaskConical,
  Scale,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
} from 'lucide-react';
import ImpactMeter from './ImpactMeter';
import { useIsMobile } from '@/hooks/use-mobile';

interface PaperModalProps {
  paper: any;
  onClose: () => void;
}

const InfoBlock = ({ title, content, icon: Icon, colorClass = 'text-blue-400' }: { title: string, content: React.ReactNode, icon: React.ElementType, colorClass?: string }) => (
  <div>
    <h3 className={`font-semibold text-white mb-3 flex items-center text-base`}>
      <Icon className={`h-5 w-5 mr-2 ${colorClass}`} />
      {title}
    </h3>
    <div className="text-gray-300 text-sm leading-relaxed space-y-2">{content}</div>
  </div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-gray-200">
    {children}
  </div>
);

const PaperModal: React.FC<PaperModalProps> = ({ paper, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'market' | 'technical' | 'investment' | 'glossary' | 'notes'>('overview');
  const [userNote, setUserNote] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const isMobile = useIsMobile();

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (value: number) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(value);
  }

  const saveUserNote = () => {
    console.log('Saving note:', userNote);
  };

  const setReminder = () => {
    console.log('Setting reminder for:', reminderDate);
  };

  const {
    summary,
    eli16_summary,
    key_insights = [],
    breakthrough_claims = [],
    affected_public_companies = [],
    commercial_viability,
    market_size_estimate,
    timeline_to_market,
    agent2_market_analysis = {},
    technical_advantages = [],
    limitations = [],
    technology_readiness_level,
    patent_potential,
    agent1_technical_analysis = {},
    investment_thesis,
    agent3_investment_analysis = {},
    agent6_stock_picks = {},
    agent8_glossary = {},
  } = paper;

  const HeaderContent = () => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-4">
          <h2 className="text-xl font-bold leading-tight mb-2 text-white">
            {paper.title}
          </h2>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400 mb-3">
            <div className="flex items-center space-x-1.5">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(paper.published_date)}</span>
            </div>
            
            {paper.market_sector && (
              <div className="flex items-center space-x-1.5">
                <Briefcase className="h-4 w-4" />
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30">{paper.market_sector}</Badge>
              </div>
            )}
            
            {paper.arxiv_id && (
              <div className="flex items-center space-x-1.5">
                <FileText className="h-4 w-4" />
                <Badge variant="outline" className="text-gray-400 border-slate-600">arXiv:{paper.arxiv_id}</Badge>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <ImpactMeter score={paper.impact_score || 0} size="lg" />
          {!isMobile && (
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`h-8 ${
            isBookmarked ? 'text-yellow-400 bg-yellow-400/20' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Bookmark className="h-4 w-4 mr-2" fill={isBookmarked ? 'currentColor' : 'none'} />
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </Button>
        
        {paper.arxiv_url && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open(paper.arxiv_url, '_blank')}
            className="h-8 border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-white"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Paper
          </Button>
        )}
      </div>
    </div>
  );

  const TabNavigation = () => (
    <div className="flex space-x-1 border-b border-slate-700 overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
      {[
        { key: 'overview', label: 'Overview', icon: Brain },
        { key: 'market', label: 'Market', icon: DollarSign },
        { key: 'technical', label: 'Technical', icon: Cpu },
        { key: 'investment', label: 'Investment', icon: ShieldCheck },
        { key: 'glossary', label: 'Glossary', icon: BookText },
        { key: 'notes', label: 'Notes & Reminders', icon: StickyNote }
      ].map((tab) => {
        const IconComponent = tab.icon;
        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
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
  );

  const TabContent = () => (
    <div className="space-y-8 py-2">
      {activeTab === 'overview' && (
        <>
          <InfoBlock
            title="Summary"
            icon={Brain}
            colorClass="text-blue-400"
            content={<p>{summary || 'No summary available.'}</p>}
          />
          <InfoBlock
            title="ELI16 Summary"
            icon={Lightbulb}
            colorClass="text-yellow-400"
            content={<p>{eli16_summary || 'No simplified summary available.'}</p>}
          />
          {key_insights.length > 0 && (
            <InfoBlock
              title="Key Insights"
              icon={TrendingUp}
              colorClass="text-green-400"
              content={
                <ul className="list-disc list-inside space-y-2">
                  {key_insights.map((insight: string, index: number) => (
                    <li key={index}>{insight}</li>
                  ))}
                </ul>
              }
            />
          )}
          {breakthrough_claims.length > 0 && (
            <InfoBlock
              title="Breakthrough Claims"
              icon={FlaskConical}
              colorClass="text-purple-400"
              content={
                <ul className="list-disc list-inside space-y-2">
                  {breakthrough_claims.map((claim: string, index: number) => (
                    <li key={index}>{claim}</li>
                  ))}
                </ul>
              }
            />
          )}
        </>
      )}

      {activeTab === 'market' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <h4 className="text-xs text-gray-400 mb-1">Commercial Viability</h4>
              <p className="text-base font-semibold text-white">{commercial_viability || 'N/A'}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <h4 className="text-xs text-gray-400 mb-1">Market Size (est.)</h4>
              <p className="text-base font-semibold text-white">{formatCurrency(market_size_estimate)}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <h4 className="text-xs text-gray-400 mb-1">Time to Market (est.)</h4>
              <p className="text-base font-semibold text-white">{timeline_to_market ? `${timeline_to_market} months` : 'N/A'}</p>
            </div>
          </div>
          {agent2_market_analysis.market_opportunities && (
            <InfoBlock
              title="Market Opportunities"
              icon={TrendingUp}
              colorClass="text-green-400"
              content={
                <ul className="list-disc list-inside space-y-2">
                  {agent2_market_analysis.market_opportunities.map((opp: string, i: number) => <li key={i}>{opp}</li>)}
                </ul>
              }
            />
          )}
          {agent2_market_analysis.competitive_landscape && (
            <InfoBlock
              title="Competitive Landscape"
              icon={Scale}
              colorClass="text-orange-400"
              content={<p>{agent2_market_analysis.competitive_landscape}</p>}
            />
          )}
          {affected_public_companies.length > 0 && (
            <InfoBlock
              title="Affected Companies"
              icon={Building2}
              colorClass="text-blue-400"
              content={
                <div className="flex flex-wrap gap-2">
                  {affected_public_companies.map((company: any, index: number) => (
                    <Pill key={index}>{company.ticker || company.name}</Pill>
                  ))}
                </div>
              }
            />
          )}
        </>
      )}
      
      {activeTab === 'technical' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <h4 className="text-xs text-gray-400 mb-1">Tech Readiness (TRL)</h4>
              <p className="text-base font-semibold text-white">{technology_readiness_level || 'N/A'}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <h4 className="text-xs text-gray-400 mb-1">Patent Potential</h4>
              <p className="text-base font-semibold text-white">{patent_potential || 'N/A'}</p>
            </div>
          </div>
          {technical_advantages.length > 0 && (
            <InfoBlock
              title="Technical Advantages"
              icon={TrendingUp}
              colorClass="text-green-400"
              content={
                <ul className="list-disc list-inside space-y-2">
                  {technical_advantages.map((adv: string, i: number) => <li key={i}>{adv}</li>)}
                </ul>
              }
            />
          )}
          {limitations.length > 0 && (
            <InfoBlock
              title="Limitations & Challenges"
              icon={AlertTriangle}
              colorClass="text-orange-400"
              content={
                <ul className="list-disc list-inside space-y-2">
                  {limitations.map((lim: string, i: number) => <li key={i}>{lim}</li>)}
                </ul>
              }
            />
          )}
          {agent1_technical_analysis.technical_risks && (
             <InfoBlock
              title="Technical Risks"
              icon={AlertTriangle}
              colorClass="text-red-400"
              content={
                <ul className="list-disc list-inside space-y-2">
                  {agent1_technical_analysis.technical_risks.map((risk: string, i: number) => <li key={i}>{risk}</li>)}
                </ul>
              }
            />
          )}
        </>
      )}

      {activeTab === 'investment' && (
        <>
          <InfoBlock
            title="Investment Thesis"
            icon={Target}
            colorClass="text-purple-400"
            content={<p>{investment_thesis || 'No investment thesis available.'}</p>}
          />
          {agent6_stock_picks.top_buys?.length > 0 && (
            <div>
              <h3 className="font-semibold text-white mb-3 flex items-center text-base"><ArrowUpRight className="h-5 w-5 mr-2 text-green-400" />Top Buys</h3>
              <div className="space-y-3">
                {agent6_stock_picks.top_buys.map((stock: any, i: number) => (
                  <div key={i} className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-green-200">{stock.company_name} ({stock.ticker})</p>
                        <p className="text-xs text-green-300">Price Target: ${stock.price_target}</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-300">{stock.timeline}</Badge>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">{stock.reasoning}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {agent6_stock_picks.top_sells?.length > 0 && (
            <div>
              <h3 className="font-semibold text-white mb-3 flex items-center text-base"><ArrowDownRight className="h-5 w-5 mr-2 text-red-400" />Top Sells</h3>
              <div className="space-y-3">
                {agent6_stock_picks.top_sells.map((stock: any, i: number) => (
                  <div key={i} className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-red-200">{stock.company_name} ({stock.ticker})</p>
                         <p className="text-xs text-red-300">Price Target: ${stock.price_target}</p>
                      </div>
                      <Badge className="bg-red-500/20 text-red-300">{stock.timeline}</Badge>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">{stock.reasoning}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {agent6_stock_picks.watch_list?.length > 0 && (
            <div>
              <h3 className="font-semibold text-white mb-3 flex items-center text-base"><Eye className="h-5 w-5 mr-2 text-blue-400" />Watchlist</h3>
              <div className="space-y-3">
                {agent6_stock_picks.watch_list.map((stock: any, i: number) => (
                  <div key={i} className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                     <p className="font-bold text-blue-200">{stock.company_name} ({stock.ticker})</p>
                     <p className="text-sm text-gray-300 mt-1">{stock.reasoning}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {agent3_investment_analysis.financial_risks && (
             <InfoBlock
              title="Financial Risks"
              icon={AlertTriangle}
              colorClass="text-red-400"
              content={
                <ul className="list-disc list-inside space-y-2">
                  {agent3_investment_analysis.financial_risks.map((risk: string, i: number) => <li key={i}>{risk}</li>)}
                </ul>
              }
            />
          )}
        </>
      )}

      {activeTab === 'glossary' && (
        <div className="space-y-4">
          {Object.entries(agent8_glossary.technical_terms || {}).map(([term, def], i) => (
            <div key={i}>
              <h4 className="font-semibold text-white">{term}</h4>
              <p className="text-gray-400 text-sm">{def as string}</p>
            </div>
          ))}
          {Object.entries(agent8_glossary.concept_explanations || {}).map(([term, def], i) => (
            <div key={i}>
              <h4 className="font-semibold text-white">{term}</h4>
              <p className="text-gray-400 text-sm">{def as string}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-white mb-2">My Notes</h3>
            <Textarea 
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="Add your personal notes and analysis here..."
              className="bg-slate-800 border-slate-600 text-white"
            />
            <Button onClick={saveUserNote} size="sm" className="mt-2">
              <Save className="h-4 w-4 mr-2" />
              Save Note
            </Button>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Set a Reminder</h3>
            <div className="flex items-center space-x-2">
              <Input 
                type="datetime-local"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <Button onClick={setReminder} size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Set
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const ModalComponent = isMobile ? Sheet : Dialog;
  const ModalContentComponent = isMobile ? SheetContent : DialogContent;

  const contentProps = {
    className: "bg-slate-900/80 backdrop-blur-xl border-slate-700 text-white max-w-4xl w-full !rounded-lg",
    ...(isMobile && { side: "bottom" as const })
  };

  return (
    <ModalComponent open={true} onOpenChange={onClose}>
      <ModalContentComponent {...contentProps}>
        <div className={`p-4 sm:p-6 ${isMobile ? 'h-[90vh] flex flex-col' : ''}`}>
          <HeaderContent />
          <div className={`${isMobile ? 'pt-4 flex-1 overflow-y-auto' : 'pt-6'}`}>
            <TabNavigation />
            <div className="mt-6">
              <TabContent />
            </div>
          </div>
        </div>
      </ModalContentComponent>
    </ModalComponent>
  );
};

export default PaperModal;
