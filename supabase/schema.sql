-- FABRIX AI - Supabase schema
-- Run this in the Supabase SQL editor (Project -> SQL Editor -> New query)

-- Extensions
create extension if not exists "uuid-ossp";

-- =========================================================
-- company_profiles: one row per authenticated user (company)
-- =========================================================
create table if not exists public.company_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  company_name text not null,
  industry text,
  contact_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.company_profiles enable row level security;

create policy "Users can view their own company profile"
  on public.company_profiles for select
  using (auth.uid() = user_id);

create policy "Users can upsert their own company profile"
  on public.company_profiles for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own company profile"
  on public.company_profiles for update
  using (auth.uid() = user_id);

-- =========================================================
-- fabric_analyses: one row per scan / analysis / what-if scenario
-- =========================================================
create table if not exists public.fabric_analyses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  fabric_name text not null default 'Untitled Fabric',
  image_path text not null,
  image_url text,
  composition jsonb,
  structure jsonb,
  washing_condition jsonb,
  detections jsonb,
  microplastic_shedding_index numeric,
  fabric_durability_index numeric,
  recommendation jsonb,
  raw_result jsonb,
  result_source text default 'unknown', -- 'ai_service' | 'mock'
  parent_analysis_id uuid references public.fabric_analyses(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists fabric_analyses_user_id_idx on public.fabric_analyses(user_id);
create index if not exists fabric_analyses_created_at_idx on public.fabric_analyses(created_at desc);

alter table public.fabric_analyses enable row level security;

create policy "Users can view their own analyses"
  on public.fabric_analyses for select
  using (auth.uid() = user_id);

create policy "Users can insert their own analyses"
  on public.fabric_analyses for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own analyses"
  on public.fabric_analyses for delete
  using (auth.uid() = user_id);

-- =========================================================
-- Storage bucket for fabric images
-- =========================================================
insert into storage.buckets (id, name, public)
values ('fabric-images', 'fabric-images', true)
on conflict (id) do nothing;

create policy "Users can upload their own fabric images"
  on storage.objects for insert
  with check (
    bucket_id = 'fabric-images'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can view their own fabric images"
  on storage.objects for select
  using (
    bucket_id = 'fabric-images'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Note: bucket is created as PUBLIC so image_url can be rendered directly in
-- the result popup without signed URLs. Switch to a private bucket + signed
-- URLs before going to production if images are sensitive.
