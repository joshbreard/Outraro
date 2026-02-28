-- Tool guides: cached personalized guides per user per tool
CREATE TABLE IF NOT EXISTS tool_guides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_slug TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  guide_content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, tool_slug)
);

-- User memory: editable context file ("What Bolt knows about you")
CREATE TABLE IF NOT EXISTS user_memory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS policies
ALTER TABLE tool_guides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own guides" ON tool_guides
  FOR ALL USING (auth.uid() = user_id);

ALTER TABLE user_memory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own memory" ON user_memory
  FOR ALL USING (auth.uid() = user_id);

-- Index for fast guide lookups
CREATE INDEX IF NOT EXISTS idx_tool_guides_user_slug ON tool_guides(user_id, tool_slug);
