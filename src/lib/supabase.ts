import { createClient } from "@supabase/supabase-js";

// 서버 액션에서만 사용. 문의 insert 전용이며 RLS로 insert만 허용됩니다. (supabase/schema.sql 참고)
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
