-- Run this SQL in Supabase SQL Editor.
-- Stores customer testimonials for app/website display.

create extension if not exists pgcrypto;

create table if not exists public.customer_testimonials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  name text not null,
  quote text not null,
  rating numeric(2,1),
  is_active boolean not null default true,
  is_approved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_customer_testimonials_public
  on public.customer_testimonials(is_active, is_approved, created_at desc);

create or replace function public.set_customer_testimonials_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_customer_testimonials_updated_at on public.customer_testimonials;
create trigger trg_customer_testimonials_updated_at
before update on public.customer_testimonials
for each row
execute procedure public.set_customer_testimonials_updated_at();
