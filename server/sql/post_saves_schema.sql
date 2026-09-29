-- Run this SQL in Supabase SQL Editor.
-- Required for the "save post for later" API in server/index.js
-- (mirrors post_likes: a simple per-user/per-post join table).

create table if not exists public.post_saves (
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create index if not exists idx_post_saves_post_id on public.post_saves(post_id);
create index if not exists idx_post_saves_user_id on public.post_saves(user_id);
