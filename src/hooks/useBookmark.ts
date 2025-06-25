
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export const useBookmark = (paperId: number, user?: User | null) => {
  const queryClient = useQueryClient();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { data: bookmark } = useQuery({
    queryKey: ['bookmark', paperId, user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase
        .from('bookmarked_papers')
        .select('id')
        .eq('paper_id', paperId)
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
        const { error } = await supabase
          .from('bookmarked_papers')
          .delete()
          .match({ paper_id: paperId, user_id: user.id });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('bookmarked_papers')
          .insert({ paper_id: paperId, user_id: user.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmark', paperId, user?.id] });
    },
    onError: (error) => {
      console.error("Bookmark error:", error.message);
    }
  });

  const handleBookmark = () => {
    if (!user) {
      alert("Please log in to bookmark papers.");
      return;
    }
    bookmarkMutation.mutate();
  };

  return {
    isBookmarked,
    handleBookmark,
    isLoading: bookmarkMutation.isPending
  };
};
