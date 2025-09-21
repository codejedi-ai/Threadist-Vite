// API client for communicating with Netlify functions
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : '/.netlify/functions';

export interface Story {
  id: string;
  title: string;
  content: string;
  author: string;
  subreddit: string;
  upvotes: number;
  comments: number;
  created_at: string;
  is_narrated: boolean;
  audio_url?: string;
  reddit_id?: string;
  reddit_url?: string;
}

export interface Subreddit {
  id: string;
  name: string;
  description: string;
  members: number;
  online: number;
  created_at: string;
  icon?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Request failed' };
      }

      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { error: 'Network error' };
    }
  }

  // Stories API
  async getStories(params?: {
    subreddit?: string;
    sort?: 'hot' | 'new' | 'rising';
    limit?: number;
  }): Promise<ApiResponse<{ stories: Story[] }>> {
    const searchParams = new URLSearchParams();
    
    if (params?.subreddit) searchParams.set('subreddit', params.subreddit);
    if (params?.sort) searchParams.set('sort', params.sort);
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = `/stories${queryString ? `?${queryString}` : ''}`;

    return this.request<{ stories: Story[] }>(endpoint);
  }

  async getStory(id: string): Promise<ApiResponse<{ story: Story }>> {
    return this.request<{ story: Story }>(`/stories/${id}`);
  }

  async createStory(story: Partial<Story>): Promise<ApiResponse<{ story: Story }>> {
    return this.request<{ story: Story }>('/stories', {
      method: 'POST',
      body: JSON.stringify(story),
    });
  }

  // Subreddits API
  async getSubreddits(params?: {
    limit?: number;
  }): Promise<ApiResponse<{ subreddits: Subreddit[] }>> {
    const searchParams = new URLSearchParams();
    
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = `/subreddits${queryString ? `?${queryString}` : ''}`;

    return this.request<{ subreddits: Subreddit[] }>(endpoint);
  }

  async getSubreddit(name: string): Promise<ApiResponse<{ subreddit: Subreddit }>> {
    return this.request<{ subreddit: Subreddit }>(`/subreddits/${name}`);
  }

  async getSubredditStories(name: string, params?: {
    sort?: 'hot' | 'new' | 'rising';
    limit?: number;
  }): Promise<ApiResponse<{ stories: Story[] }>> {
    const searchParams = new URLSearchParams();
    
    if (params?.sort) searchParams.set('sort', params.sort);
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = `/subreddits/${name}/stories${queryString ? `?${queryString}` : ''}`;

    return this.request<{ stories: Story[] }>(endpoint);
  }
}

export const apiClient = new ApiClient();