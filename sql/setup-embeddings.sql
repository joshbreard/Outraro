-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard > SQL Editor)
-- Step 1: Enable the vector extension
create extension if not exists vector;

-- Step 2: Create the article_embeddings table
create table if not exists article_embeddings (
  id bigserial primary key,
  article_id text not null,
  article_title text not null,
  article_category text not null,
  chunk_index integer not null,
  content text not null,
  embedding vector(1536),
  created_at timestamp with time zone default now(),
  unique(article_id, chunk_index)
);

-- Step 3: Create an index for fast vector search
create index if not exists article_embeddings_embedding_idx
  on article_embeddings
  using hnsw (embedding vector_cosine_ops);

-- Step 4: Create the search function
create or replace function match_article_chunks(
  query_embedding vector(1536),
  match_threshold float default 0.5,
  match_count int default 5,
  filter_article_id text default null
)
returns table (
  article_id text,
  article_title text,
  article_category text,
  content text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    ae.article_id,
    ae.article_title,
    ae.article_category,
    ae.content,
    1 - (ae.embedding <=> query_embedding) as similarity
  from article_embeddings ae
  where 1 - (ae.embedding <=> query_embedding) > match_threshold
    and (filter_article_id is null or ae.article_id = filter_article_id)
  order by ae.embedding <=> query_embedding
  limit match_count;
end;
$$;
