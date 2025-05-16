// src/supabase/supabase.client.ts
import { createClient } from '@supabase/supabase-js';
import { validateConfig } from '../config/supabase.config';

const { url, key } = validateConfig();

export const supabase = createClient(url, key, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});