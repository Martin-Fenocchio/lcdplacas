-- LcdPlacas — products table (source of truth for the catalog).
-- Apply with:  psql "$SUPABASE_DB_URL" -f supabase/schema.sql

create table if not exists public.products (
  id            bigint generated always as identity primary key,
  slug          text not null unique,
  title         text not null,
  code          text,
  price         integer not null,
  currency      text not null default 'ARS',
  condition     text,
  category      text not null,
  category_slug text not null,
  description   text,
  url           text,
  images        jsonb not null default '[]'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists products_category_slug_idx on public.products (category_slug);

-- The catalog is public, so allow anonymous reads. Writes go through the
-- Supabase dashboard, the service role, or direct SQL (blocked for anon by RLS).
alter table public.products enable row level security;

drop policy if exists "Public read products" on public.products;
create policy "Public read products"
  on public.products for select
  using (true);
