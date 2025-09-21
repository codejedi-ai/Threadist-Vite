import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface Story {
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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  try {
    const { httpMethod, path, queryStringParameters } = event;
    const pathSegments = path.split('/').filter(Boolean);

    switch (httpMethod) {
      case 'GET':
        if (pathSegments.length === 2) {
          // GET /api/stories - Get all stories with optional filters
          return await getStories(queryStringParameters);
        } else if (pathSegments.length === 3) {
          // GET /api/stories/:id - Get specific story
          const storyId = pathSegments[2];
          return await getStory(storyId);
        }
        break;

      case 'POST':
        if (pathSegments.length === 2) {
          // POST /api/stories - Create new story
          const body = JSON.parse(event.body || '{}');
          return await createStory(body);
        }
        break;

      default:
        return {
          statusCode: 405,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Not found' }),
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

async function getStories(queryParams: any) {
  try {
    let query = supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (queryParams?.subreddit) {
      query = query.eq('subreddit', queryParams.subreddit);
    }

    if (queryParams?.sort) {
      switch (queryParams.sort) {
        case 'hot':
          query = query.order('upvotes', { ascending: false });
          break;
        case 'new':
          query = query.order('created_at', { ascending: false });
          break;
        case 'rising':
          // Simple rising algorithm: recent stories with good upvote ratio
          query = query
            .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
            .order('upvotes', { ascending: false });
          break;
      }
    }

    if (queryParams?.limit) {
      query = query.limit(parseInt(queryParams.limit));
    }

    const { data, error } = await query;

    if (error) throw error;

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ stories: data || [] }),
    };
  } catch (error) {
    console.error('Error fetching stories:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to fetch stories' }),
    };
  }
}

async function getStory(storyId: string) {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', storyId)
      .single();

    if (error) throw error;

    if (!data) {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Story not found' }),
      };
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ story: data }),
    };
  } catch (error) {
    console.error('Error fetching story:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to fetch story' }),
    };
  }
}

async function createStory(storyData: Partial<Story>) {
  try {
    const { data, error } = await supabase
      .from('stories')
      .insert([storyData])
      .select()
      .single();

    if (error) throw error;

    return {
      statusCode: 201,
      headers: corsHeaders,
      body: JSON.stringify({ story: data }),
    };
  } catch (error) {
    console.error('Error creating story:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to create story' }),
    };
  }
}