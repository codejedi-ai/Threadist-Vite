import { useState, useEffect, useCallback } from 'react';
import { useDataWorker } from './useDataWorker';
import { Subreddit } from '../lib/api';

export interface UseSubredditsOptions {
  limit?: number;
  autoFetch?: boolean;
}

export interface UseSubredditsReturn {
  subreddits: Subreddit[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useSubreddits = (options: UseSubredditsOptions = {}): UseSubredditsReturn => {
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { sendMessage, isWorkerReady } = useDataWorker();
  const { limit, autoFetch = true } = options;

  const fetchSubreddits = useCallback(async () => {
    if (!isWorkerReady) return;

    setLoading(true);
    setError(null);

    try {
      const result = await sendMessage('GET_SUBREDDITS', { limit });
      setSubreddits(result.subreddits || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch subreddits');
      setSubreddits([]);
    } finally {
      setLoading(false);
    }
  }, [sendMessage, isWorkerReady, limit]);

  useEffect(() => {
    if (autoFetch && isWorkerReady) {
      fetchSubreddits();
    }
  }, [fetchSubreddits, autoFetch, isWorkerReady]);

  return {
    subreddits,
    loading,
    error,
    refetch: fetchSubreddits,
  };
};