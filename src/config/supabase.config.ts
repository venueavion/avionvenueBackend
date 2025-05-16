// src/config/supabase.config.ts
export const supabaseConfig = {
  url: process.env.SUPABASE_URL,
  key: process.env.SUPABASE_KEY,
  jwtSecret: process.env.SUPABASE_JWT_SECRET
};

export function validateConfig() {
  if (!supabaseConfig.url) throw new Error('SUPABASE_URL is required');
  if (!supabaseConfig.key) throw new Error('SUPABASE_KEY is required');
  return supabaseConfig as { url: string; key: string };
}