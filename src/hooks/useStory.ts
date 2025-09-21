import { useState, useEffect, useCallback } from 'react';
import { useDataWorker } from './useDataWorker';
import { Story } from '../lib/api';

export interface UseStoryReturn {
  story: Story | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useStory = (storyId: string | undefined): UseStoryReturn => {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { sendMessage, isWorkerReady } = useDataWorker();

  const fetchStory = useCallback(async () => {
    if (!storyId || !isWorkerReady) return;

    setLoading(true);
    setError(null);

    try {
      const result = await sendMessage('GET_STORY', { id: storyId });
      setStory(result.story || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch story');
      setStory(null);
    } finally {
      setLoading(false);
    }
  }, [sendMessage, isWorkerReady, storyId]);

  useEffect(() => {
    if (storyId && isWorkerReady) {
      fetchStory();
    }
  }, [fetchStory, storyId, isWorkerReady]);

  return {
    story,
    loading,
    error,
    refetch: fetchStory,
  };
};