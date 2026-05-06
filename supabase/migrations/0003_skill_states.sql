-- PR6: Skill mastery tracking + parent dashboard

create table if not exists public.skill_states (
  child_id uuid not null references public.children(id) on delete cascade,
  skill text not null,
  mastery_score double precision not null default 0.5,
  attempts_count int not null default 0,
  correct_count int not null default 0,
  last_practiced_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (child_id, skill)
);

create index if not exists skill_states_child_mastery_idx
on public.skill_states(child_id, mastery_score asc, attempts_count desc);

alter table public.skill_states enable row level security;

create policy "skill_states_select_own_children"
on public.skill_states
for select
to authenticated
using (
  exists (
    select 1
    from public.children c
    where c.id = skill_states.child_id
      and c.parent_user_id = auth.uid()
  )
);

create policy "skill_states_insert_own_children"
on public.skill_states
for insert
to authenticated
with check (
  exists (
    select 1
    from public.children c
    where c.id = skill_states.child_id
      and c.parent_user_id = auth.uid()
  )
);

create policy "skill_states_update_own_children"
on public.skill_states
for update
to authenticated
using (
  exists (
    select 1
    from public.children c
    where c.id = skill_states.child_id
      and c.parent_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.children c
    where c.id = skill_states.child_id
      and c.parent_user_id = auth.uid()
  )
);

