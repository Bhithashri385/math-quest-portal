-- PR1: Parent auth + child profiles

create extension if not exists "pgcrypto";

create table if not exists public.children (
  id uuid primary key default gen_random_uuid(),
  parent_user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  grade int not null check (grade in (3, 4, 5)),
  created_at timestamptz not null default now()
);

alter table public.children enable row level security;

-- Parents can read their children
create policy "children_select_own"
on public.children
for select
to authenticated
using (parent_user_id = auth.uid());

-- Parents can insert children under their own user id
create policy "children_insert_own"
on public.children
for insert
to authenticated
with check (parent_user_id = auth.uid());

-- Parents can update their children
create policy "children_update_own"
on public.children
for update
to authenticated
using (parent_user_id = auth.uid())
with check (parent_user_id = auth.uid());

-- Parents can delete their children
create policy "children_delete_own"
on public.children
for delete
to authenticated
using (parent_user_id = auth.uid());

