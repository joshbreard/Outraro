-- Run this in your Supabase SQL Editor after setup-embeddings.sql

-- Saved articles table
create table if not exists saved_articles (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  article_id text not null,
  article_title text not null,
  article_category text not null,
  article_image_url text,
  saved_at timestamptz default now(),
  unique(user_id, article_id)
);

create index if not exists saved_articles_user_idx on saved_articles(user_id);

-- Ro conversations table
create table if not exists ro_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  article_id text,
  article_title text,
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists ro_conversations_user_idx on ro_conversations(user_id, updated_at desc);

-- Row Level Security
alter table saved_articles enable row level security;
alter table ro_conversations enable row level security;

create policy "Users can manage own saved articles" on saved_articles
  for all using (auth.uid() = user_id);

create policy "Users can manage own conversations" on ro_conversations
  for all using (auth.uid() = user_id);
