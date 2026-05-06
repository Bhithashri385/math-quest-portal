-- PR5: Attempts + Notebook

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children(id) on delete cascade,
  input_type text not null check (input_type in ('text', 'ocr')),
  problem_text text not null,
  mode text not null check (mode in ('hint', 'show', 'try')),
  student_answer text,
  is_correct boolean,
  final_answer text,
  ai_steps jsonb not null default '[]'::jsonb,
  skill_tags text[] not null default '{}'::text[],
  created_at timestamptz not null default now()
);

create index if not exists attempts_child_id_created_at_idx
on public.attempts(child_id, created_at desc);

alter table public.attempts enable row level security;

-- Helper predicate: parent owns the child profile
-- We use EXISTS against children to avoid leaking child ids.

create policy "attempts_select_own_children"
on public.attempts
for select
to authenticated
using (
  exists (
    select 1
    from public.children c
    where c.id = attempts.child_id
      and c.parent_user_id = auth.uid()
  )
);

create policy "attempts_insert_own_children"
on public.attempts
for insert
to authenticated
with check (
  exists (
    select 1
    from public.children c
    where c.id = attempts.child_id
      and c.parent_user_id = auth.uid()
  )
);

create policy "attempts_delete_own_children"
on public.attempts
for delete
to authenticated
using (
  exists (
    select 1
    from public.children c
    where c.id = attempts.child_id
      and c.parent_user_id = auth.uid()
  )
);

