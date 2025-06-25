
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Bookmark,
  Bell,
  StickyNote,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface PaperActionsProps {
  isBookmarked: boolean;
  onBookmark: () => void;
  isBookmarkLoading: boolean;
  onAnalyze: () => void;
  arxivUrl?: string;
}

const PaperActions: React.FC<PaperActionsProps> = ({
  isBookmarked,
  onBookmark,
  isBookmarkLoading,
  onAnalyze,
  arxivUrl
}) => {
  const [hasReminder, setHasReminder] = useState(false);
  const [hasNote, setHasNote] = useState(false);

  return (
    <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10">
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={onBookmark}
          disabled={isBookmarkLoading}
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
        {arxivUrl && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => window.open(arxivUrl, '_blank')}
            className="p-2 h-8 w-8 text-gray-400 hover:text-white"
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        )}
        
        <Button
          size="sm"
          onClick={onAnalyze}
          className="h-8 px-3 bg-blue-500/20 text-blue-400 border border-blue-400/30 hover:bg-blue-500/30 text-xs"
        >
          <BookOpen className="h-3 w-3 mr-1" />
          Analyze
        </Button>
      </div>
    </div>
  );
};

export default PaperActions;
