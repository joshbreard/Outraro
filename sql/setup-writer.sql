-- ============================================
-- Message Writer: copy tracking + generation log
-- Run this in Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS public.writer_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  channel TEXT NOT NULL CHECK (channel IN ('email', 'linkedin', 'sms')),
  prospect_name TEXT,
  prospect_company TEXT,
  prospect_role TEXT,
  prospect_context TEXT,
  variant_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.writer_copies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  generation_id UUID REFERENCES public.writer_generations(id) ON DELETE SET NULL,
  channel TEXT NOT NULL CHECK (channel IN ('email', 'linkedin', 'sms')),
  variant_index INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.writer_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.writer_copies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own generations"
  ON public.writer_generations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generations"
  ON public.writer_generations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own copies"
  ON public.writer_copies FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own copies"
  ON public.writer_copies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_writer_copies_channel ON public.writer_copies(channel);
CREATE INDEX idx_writer_copies_user ON public.writer_copies(user_id);
CREATE INDEX idx_writer_generations_user ON public.writer_generations(user_id);
