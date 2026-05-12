-- ============================================================
-- Kartarpur Journey — new tables: package_groups + enquiries
-- Run this in Supabase → SQL Editor.
-- ============================================================

-- ─── GROUP DEPARTURES ───────────────────────────────────────
create table if not exists public.package_groups (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  package_id      uuid references public.packages(id) on delete cascade,
  group_name      text,
  departure_date  date,
  return_date     date,
  total_seats     integer,
  available_seats integer,
  status          text default 'open',    -- open | filling | full | closed
  notes           text,
  is_active       boolean not null default true
);

alter table public.package_groups enable row level security;

create policy "package_groups: public read"
  on public.package_groups for select
  to anon, authenticated using (true);

create policy "package_groups: authenticated insert"
  on public.package_groups for insert
  to authenticated with check (true);

create policy "package_groups: authenticated update"
  on public.package_groups for update
  to authenticated using (true) with check (true);

create policy "package_groups: authenticated delete"
  on public.package_groups for delete
  to authenticated using (true);

-- ─── ENQUIRIES ──────────────────────────────────────────────
create table if not exists public.enquiries (
  id                   uuid primary key default gen_random_uuid(),
  created_at           timestamptz not null default now(),
  first_name           text,
  last_name            text,
  email                text,
  phone                text,
  guests               text,
  package_id           uuid references public.packages(id) on delete set null,
  package_name         text,
  package_price        numeric,
  duration             text,
  group_id             uuid references public.package_groups(id) on delete set null,
  group_name           text,
  group_departure_date date,
  special_requests     text,
  enquiry_method       text,               -- whatsapp | email
  status               text not null default 'new'   -- new | contacted | confirmed | closed
);

alter table public.enquiries enable row level security;

-- Anyone (the public website) may create an enquiry…
create policy "enquiries: public insert"
  on public.enquiries for insert
  to anon, authenticated with check (true);

-- …but only authenticated admins may read / manage them.
create policy "enquiries: authenticated read"
  on public.enquiries for select
  to authenticated using (true);

create policy "enquiries: authenticated update"
  on public.enquiries for update
  to authenticated using (true) with check (true);

create policy "enquiries: authenticated delete"
  on public.enquiries for delete
  to authenticated using (true);
