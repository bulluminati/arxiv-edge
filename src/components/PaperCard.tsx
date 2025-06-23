import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  Building2, 
  Bookmark,
  Bell,
  StickyNote,
  ExternalLink,
  Zap,
  Factory,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import ImpactMeter from './ImpactMeter';
import PaperModal from './PaperModal';
import { getGICSSector, mapToGICSSector } from '@/utils/gicsUtils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface PaperCardProps {
  paper: any;
  user?: User | null;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper, user }) => {
  const queryClient = useQueryClient();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasReminder, setHasReminder] = useState(false);
  const [hasNote, setHasNote] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { data: bookmark } = useQuery({
    queryKey: ['bookmark', paper.id, user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase
        .from('bookmarked_papers')
        .select('id')
        .eq('paper_id', paper.id)
        .eq('user_id', user.id)
        .single();
      return data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    setIsBookmarked(!!bookmark);
  }, [bookmark]);

  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User not logged in");

      if (isBookmarked) {
        // Delete bookmark
        const { error } = await supabase
          .from('bookmarked_papers')
          .delete()
          .match({ paper_id: paper.id, user_id: user.id });
        if (error) throw error;
      } else {
        // Add bookmark
        const { error } = await supabase
          .from('bookmarked_papers')
          .insert({ paper_id: paper.id, user_id: user.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmark', paper.id, user?.id] });
    },
    onError: (error) => {
      console.error("Bookmark error:", error.message);
    }
  });

  const handleBookmarkClick = () => {
    if (!user) {
      // Or redirect to login
      alert("Please log in to bookmark papers.");
      return;
    }
    bookmarkMutation.mutate();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getImpactColor = (score: number) => {
    if (score >= 8) return 'text-red-400';
    if (score >= 6) return 'text-orange-400';
    if (score >= 4) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const affectedCompanies = paper.affected_public_companies || [];
  const impactScore = paper.impact_score || 0;
  
  // Get GICS sector information for affected industry
  const gicsSector = getGICSSector(paper.market_sector || '');
  const affectedIndustry = mapToGICSSector(paper.market_sector || '');
  
  // Try to identify specific industry group within the sector
  const specificIndustryGroup = gicsSector && paper.market_sector ? 
    gicsSector.industryGroups.find(group =>
      paper.market_sector.toLowerCase().includes(group.toLowerCase()) ||
      group.toLowerCase().includes(paper.market_sector.toLowerCase())
    ) : null;

  return (
    <>
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300 group">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 
                className="font-semibold text-white text-sm leading-tight mb-2 cursor-pointer hover:text-blue-400 transition-colors line-clamp-2"
                onClick={() => setShowModal(true)}
              >
                {paper.title}
              </h3>
              
              <div className="flex items-center space-x-3 text-xs text-gray-400 mb-2">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(paper.published_date)}</span>
                </div>
                
                {paper.market_sector && (
                  <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-400 border-blue-400/30">
                    {paper.market_sector}
                  </Badge>
                )}
              </div>
            </div>

            {/* Impact Score */}
            <div className="ml-3">
              <ImpactMeter score={impactScore} size="sm" />
            </div>
          </div>

          {/* Abstract Preview */}
          <p className="text-gray-300 text-xs leading-relaxed mb-3 line-clamp-2">
            {paper.abstract || 'No abstract available'}
          </p>

          {/* Affected Industry - GICS Sector */}
          {affectedIndustry && (
            <div className="mb-3">
              <div className="flex items-center space-x-1 mb-1">
                <Factory className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-400">Affected Industry:</span>
              </div>
              <div className="space-y-1">
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    gicsSector 
                      ? `${gicsSector.color} ${gicsSector.textColor} ${gicsSector.borderColor}` 
                      : 'bg-gray-500/10 text-gray-400 border-gray-400/30'
                  }`}
                  title={gicsSector?.description}
                >
                  {gicsSector?.icon} {affectedIndustry}
                </Badge>
                {specificIndustryGroup && (
                  <Badge 
                    variant="outline" 
                    className="text-xs bg-white/5 text-gray-300 border-gray-400/20 ml-2"
                  >
                    {specificIndustryGroup}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Affected Companies */}
          {affectedCompanies.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center space-x-1 mb-1">
                <Building2 className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-400">Affected Companies:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {affectedCompanies.slice(0, 3).map((company: any, index: number) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs bg-green-500/10 text-green-400 border-green-400/30"
                  >
                    {company.ticker || company.name}
                  </Badge>
                ))}
                {affectedCompanies.length > 3 && (
                  <Badge variant="outline" className="text-xs text-gray-400">
                    +{affectedCompanies.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Key Insights */}
          {paper.key_insights && paper.key_insights.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center space-x-1 mb-1">
                <Zap className="h-3 w-3 text-yellow-400" />
                <span className="text-xs text-gray-400">Key Insight:</span>
              </div>
              <p className="text-xs text-yellow-200 line-clamp-1">
                {paper.key_insights[0]}
              </p>
            </div>
          )}

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center space-x-1" title="Commercial Viability">
              <Zap className="h-3.5 w-3.5 text-purple-400" />
              <span className="font-medium truncate">{paper.commercial_viability || 'N/A'}</span>
            </div>
            <div className="flex items-center space-x-1" title="Time to Market">
              <Clock className="h-3.5 w-3.5 text-blue-400" />
              <span className="font-medium">{paper.timeline_to_market ? `${paper.timeline_to_market} mo` : 'N/A'}</span>
            </div>
            <div className="flex items-center space-x-1" title="Patent Potential">
              <ShieldCheck className="h-3.5 w-3.5 text-green-400" />
              <span className="font-medium">{paper.patent_potential || 'N/A'}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleBookmarkClick}
                disabled={bookmarkMutation.isPending}
                className={`p-2 h-8 w-8 ${
                  isBookmarked ? 'text-yellow-400 bg-yellow-400/20' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Bookmark className="h-3 w-3" fill={isBookmarked ? 'currentColor' : 'none'} />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setHasReminder(!hasReminder)}
                className={`p-2 h-8 w-8 ${
                  hasReminder ? 'text-green-400 bg-green-400/20' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Bell className="h-3 w-3" fill={hasReminder ? 'currentColor' : 'none'} />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setHasNote(!hasNote)}
                className={`p-2 h-8 w-8 ${
                  hasNote ? 'text-blue-400 bg-blue-400/20' : 'text-gray-400 hover:text-white'
                }`}
              >
                <StickyNote className="h-3 w-3" fill={hasNote ? 'currentColor' : 'none'} />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              {paper.arxiv_url && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => window.open(paper.arxiv_url, '_blank')}
                  className="p-2 h-8 w-8 text-gray-400 hover:text-white"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
              
              <Button
                size="sm"
                onClick={() => setShowModal(true)}
                className="h-8 px-3 bg-blue-500/20 text-blue-400 border border-blue-400/30 hover:bg-blue-500/30 text-xs"
              >
                <BookOpen className="h-3 w-3 mr-1" />
                Analyze
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Paper Detail Modal */}
      {showModal && (
        <PaperModal 
          paper={paper} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
};

export default PaperCard;
