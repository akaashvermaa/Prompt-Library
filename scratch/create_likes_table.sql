-- Run this in Supabase Dashboard → SQL Editor

create table public.user_likes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  prompt_id text not null,
  created_at timestamptz default now() not null,
  unique(user_id, prompt_id)
);

alter table public.user_likes enable row level security;

create policy "Users can view own likes" on public.user_likes
  for select using (auth.uid() = user_id);

create policy "Users can insert own likes" on public.user_likes
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own likes" on public.user_likes
  for delete using (auth.uid() = user_id);
