// Web Worker for handling API requests without blocking the main thread
import { apiClient, Story, Subreddit } from '../lib/api';

export interface WorkerMessage {
  id: string;
  type: 'GET_STORIES' | 'GET_STORY' | 'GET_SUBREDDITS' | 'GET_SUBREDDIT' | 'GET_SUBREDDIT_STORIES';
  payload?: any;
}

export interface WorkerResponse {
  id: string;
  type: string;
  success: boolean;
  data?: any;
  error?: string;
}

// Handle messages from the main thread
self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const { id, type, payload } = event.data;

  try {
    let result;

    switch (type) {
      case 'GET_STORIES':
        result = await apiClient.getStories(payload);
        break;

      case 'GET_STORY':
        result = await apiClient.getStory(payload.id);
        break;

      case 'GET_SUBREDDITS':
        result = await apiClient.getSubreddits(payload);
        break;

      case 'GET_SUBREDDIT':
        result = await apiClient.getSubreddit(payload.name);
        break;

      case 'GET_SUBREDDIT_STORIES':
        result = await apiClient.getSubredditStories(payload.name, payload.params);
        break;

      default:
        throw new Error(`Unknown message type: ${type}`);
    }

    const response: WorkerResponse = {
      id,
      type,
      success: !result.error,
      data: result.data,
      error: result.error,
    };

    self.postMessage(response);
  } catch (error) {
    const response: WorkerResponse = {
      id,
      type,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };

    self.postMessage(response);
  }
};

// Export empty object to make this a module
export {};