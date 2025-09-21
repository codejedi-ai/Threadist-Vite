import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
          // GET /api/subreddits - Get all subreddits
          return await getSubreddits(queryStringParameters);
        } else if (pathSegments.length === 3) {
          // GET /api/subreddits/:name - Get specific subreddit
          const subredditName = pathSegments[2];
          return await getSubreddit(subredditName);
        } else if (pathSegments.length === 4 && pathSegments[3] === 'stories') {
          // GET /api/subreddits/:name/stories - Get stories from specific subreddit
          const subredditName = pathSegments[2];
          return await getSubredditStories(subredditName, queryStringParameters);
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

async function getSubreddits(queryParams: any) {
  try {
    let query = supabase
      .from('subreddits')
      .select('*')
      .order('members', { ascending: false });

    if (queryParams?.limit) {
      query = query.limit(parseInt(queryParams.limit));
    }

    const { data, error } = await query;

    if (error) throw error;

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ subreddits: data || [] }),
    };
  } catch (error) {
    console.error('Error fetching subreddits:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to fetch subreddits' }),
    };
  }
}

async function getSubreddit(subredditName: string) {
  try {
    const { data, error } = await supabase
      .from('subreddits')
      .select('*')
      .eq('name', subredditName)
      .single();

    if (error) throw error;

    if (!data) {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Subreddit not found' }),
      };
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ subreddit: data }),
    };
  } catch (error) {
    console.error('Error fetching subreddit:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to fetch subreddit' }),
    };
  }
}

async function getSubredditStories(subredditName: string, queryParams: any) {
  try {
    let query = supabase
      .from('stories')
      .select('*')
      .eq('subreddit', subredditName)
      .order('created_at', { ascending: false });

    if (queryParams?.sort) {
      switch (queryParams.sort) {
        case 'hot':
          query = query.order('upvotes', { ascending: false });
          break;
        case 'new':
          query = query.order('created_at', { ascending: false });
          break;
        case 'rising':
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
    console.error('Error fetching subreddit stories:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to fetch subreddit stories' }),
    };
  }
}