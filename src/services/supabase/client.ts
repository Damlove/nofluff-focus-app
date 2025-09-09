// Located at: src/services/supabase/client.ts

import { createClient } from '@supabase/supabase-js';
import { TEMP_SUPABASE_URL, TEMP_SUPABASE_ANON_KEY } from '@/temp_config'; // <-- Import from our temp file

const supabaseUrl = TEMP_SUPABASE_URL;
const supabaseAnonKey = TEMP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase keys are missing from temp_config.ts");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);