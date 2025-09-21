import { useState, useEffect, useCallback } from 'react';
import { useDataWorker } from './useDataWorker';
import { Story } from '../lib/api';

export interface UseStoriesOptions {
  subreddit?: string;
  sort?: 'hot' | 'new' | 'rising';
  limit?: number;
  autoFetch?: boolean;
}

export interface UseStoriesReturn {
  stories: Story[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useStories = (options: UseStoriesOptions = {}): UseStoriesReturn => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { sendMessage, isWorkerReady } = useDataWorker();
  const { subreddit, sort = 'hot', limit, autoFetch = true } = options;

  const fetchStories = useCallback(async () => {
    if (!isWorkerReady) return;

    setLoading(true);
    setError(null);

    try {
      const result = await sendMessage('GET_STORIES', {
        subreddit,
        sort,
        limit,
      });

      setStories(result.stories || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stories');
      setStories([]);
    } finally {
      setLoading(false);
    }
  }, [sendMessage, isWorkerReady, subreddit, sort, limit]);

  useEffect(() => {
    if (autoFetch && isWorkerReady) {
      fetchStories();
    }
  }, [fetchStories, autoFetch, isWorkerReady]);

  return {
    stories,
    loading,
    error,
    refetch: fetchStories,
  };
};