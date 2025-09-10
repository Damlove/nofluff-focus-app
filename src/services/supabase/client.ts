// Located at: src/services/supabase/client.ts

import { createClient } from '@supabase/supabase-js';

// This reads the secrets you configured in GitHub Actions.
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// This check is important for debugging.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and/or Anon Key were not found in environment variables.");
}

// Initialize and export the Supabase client.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);