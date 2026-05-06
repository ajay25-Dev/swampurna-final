-- Run this SQL in Supabase SQL Editor.
-- Master table for Jan Aushadhi / medical kendras.

create extension if not exists pgcrypto;

create table if not exists public.jan_aushadhi_kendras (
  id uuid primary key default gen_random_uuid(),
  sr_no integer,
  kendra_code text not null,
  name text not null,
  state_name text not null,
  district_name text,
  pin_code text,
  address text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint jan_aushadhi_kendras_kendra_code_unique unique (kendra_code)
);

create index if not exists idx_jan_aushadhi_kendras_state_district
  on public.jan_aushadhi_kendras(state_name, district_name);

create index if not exists idx_jan_aushadhi_kendras_pin
  on public.jan_aushadhi_kendras(pin_code);

create or replace function public.set_jan_aushadhi_kendras_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_jan_aushadhi_kendras_updated_at on public.jan_aushadhi_kendras;
create trigger trg_jan_aushadhi_kendras_updated_at
before update on public.jan_aushadhi_kendras
for each row
execute procedure public.set_jan_aushadhi_kendras_updated_at();

