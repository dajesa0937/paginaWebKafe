-- =========================================================
-- K'FE — Configuración de la base de datos para "Entrega inmediata"
-- Cómo usarlo:
--   1. Entra a tu proyecto en https://supabase.com
--   2. Menú lateral → SQL Editor → New query
--   3. Copia y pega TODO este archivo y presiona "Run"
-- =========================================================

-- 1) Tabla de productos de entrega inmediata -------------------------------
create table if not exists public.productos_inmediata (
  id          uuid primary key default gen_random_uuid(),
  creado      timestamptz not null default now(),
  nombre      text not null,
  descripcion text,
  precio      integer,                 -- en pesos, sin puntos. Ej: 25000
  cantidad    integer,                 -- unidades disponibles (opcional)
  categoria   text default 'General',  -- Mujer, Hombre, Pijamas, Jeans, General
  foto_url    text,
  activo      boolean not null default true,
  orden       integer not null default 0
);

alter table public.productos_inmediata enable row level security;

-- Cualquiera puede VER los productos activos
drop policy if exists "lectura publica" on public.productos_inmediata;
create policy "lectura publica" on public.productos_inmediata
  for select using (activo = true);

-- Solo un usuario con sesión iniciada (el administrador) puede ver todo y escribir
drop policy if exists "admin lee todo" on public.productos_inmediata;
create policy "admin lee todo" on public.productos_inmediata
  for select to authenticated using (true);

drop policy if exists "admin crea" on public.productos_inmediata;
create policy "admin crea" on public.productos_inmediata
  for insert to authenticated with check (true);

drop policy if exists "admin edita" on public.productos_inmediata;
create policy "admin edita" on public.productos_inmediata
  for update to authenticated using (true) with check (true);

drop policy if exists "admin borra" on public.productos_inmediata;
create policy "admin borra" on public.productos_inmediata
  for delete to authenticated using (true);

-- 2) Almacenamiento de fotos ----------------------------------------------
insert into storage.buckets (id, name, public)
values ('fotos', 'fotos', true)
on conflict (id) do update set public = true;

drop policy if exists "fotos lectura publica" on storage.objects;
create policy "fotos lectura publica" on storage.objects
  for select using (bucket_id = 'fotos');

drop policy if exists "fotos admin sube" on storage.objects;
create policy "fotos admin sube" on storage.objects
  for insert to authenticated with check (bucket_id = 'fotos');

drop policy if exists "fotos admin actualiza" on storage.objects;
create policy "fotos admin actualiza" on storage.objects
  for update to authenticated using (bucket_id = 'fotos');

drop policy if exists "fotos admin borra" on storage.objects;
create policy "fotos admin borra" on storage.objects
  for delete to authenticated using (bucket_id = 'fotos');

-- =========================================================
-- 3) Crear el usuario administrador (NO se hace aquí):
--    Menú lateral → Authentication → Users → "Add user" →
--    "Create new user": correo y contraseña. Marca "Auto Confirm User".
--    Con ese correo y contraseña entra el administrador en admin.html
-- =========================================================
