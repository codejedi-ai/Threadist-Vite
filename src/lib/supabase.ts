import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string
          email: string
          name: string | null
          interests: string[] | null
          created_at: string
          notified: boolean
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          interests?: string[] | null
          created_at?: string
          notified?: boolean
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          interests?: string[] | null
          created_at?: string
          notified?: boolean
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          interests: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          interests?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          interests?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}