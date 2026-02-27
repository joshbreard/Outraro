-- ============================================
-- Run this in Supabase SQL Editor
-- Dashboard > SQL Editor > New Query > Paste > Run
-- ============================================

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  subscription_status TEXT DEFAULT 'inactive',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Service role full access"
  ON public.users FOR ALL
  USING (auth.role() = 'service_role');

CREATE INDEX idx_users_stripe_customer_id
  ON public.users(stripe_customer_id);
