
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables missing:', {
    VITE_SUPABASE_URL: !!supabaseUrl,
    VITE_SUPABASE_ANON_KEY: !!supabaseAnonKey
  });
  
  // Provide a fallback that won't crash the app
  export const supabase = createClient(
    'https://placeholder.supabase.co', 
    'placeholder-key'
  );
} else {
  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
}
