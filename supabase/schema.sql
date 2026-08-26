create extension if not exists "pgcrypto";

create type user_role as enum ('USER', 'WALI', 'SCHOLAR', 'MODERATOR', 'ADMIN');
create type verification_status as enum ('PENDING', 'VERIFIED', 'REJECTED');
create type match_status as enum ('PENDING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN', 'BLOCKED');
create type message_type as enum ('QUESTION', 'ANSWER', 'NOTE', 'SYSTEM');
create type event_type as enum ('FAMILY_MEETING', 'SCHOLAR_SESSION', 'CHECK_IN');
create type event_status as enum ('PENDING', 'APPROVED', 'DECLINED', 'COMPLETED', 'CANCELED');
create type privacy_level as enum ('PUBLIC', 'MATCHED_ONLY', 'WALI_ONLY', 'PRIVATE');

create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text unique not null,
  phone text unique,
  gender text not null,
  date_of_birth date not null,
  role user_role not null default 'USER',
  is_verified boolean not null default false,
  verification_status verification_status not null default 'PENDING',
  wali_required boolean not null default false,
  wali_user_id uuid references users(id) on delete set null,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references users(id) on delete cascade,
  bio text,
  madhhab text,
  prayer_frequency int,
  quran_recitation_level text,
  hijab_or_beard text,
  halal_lifestyle text,
  marriage_timeline text,
  children_preference text,
  relocation_willingness text,
  education text,
  occupation text,
  location text,
  privacy_level privacy_level not null default 'MATCHED_ONLY',
  visible_to_wali boolean not null default true,
  photo_visibility text not null default 'BLURRED',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists matches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  candidate_user_id uuid not null references users(id) on delete cascade,
  match_score int not null default 0,
  status match_status not null default 'PENDING',
  match_reason text,
  compatibility_notes text,
  initiated_by uuid references users(id) on delete set null,
  accepted_at timestamptz,
  rejected_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, candidate_user_id)
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references matches(id) on delete cascade,
  sender_user_id uuid not null references users(id) on delete cascade,
  recipient_user_id uuid not null references users(id) on delete cascade,
  message_type message_type not null default 'NOTE',
  content text not null,
  is_guardian_visible boolean not null default true,
  is_flagged boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists scholars_content (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  content_type text not null,
  body text not null,
  approved_by text,
  approved_at timestamptz,
  active boolean not null default true,
  source_reference text,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references matches(id) on delete set null,
  event_type event_type not null,
  title text not null,
  scheduled_at timestamptz not null,
  location text,
  mode text not null,
  wali_approved boolean not null default false,
  guardian_visible boolean not null default true,
  status event_status not null default 'PENDING',
  created_by uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references users(id) on delete set null,
  action text not null,
  target_type text not null,
  target_id text,
  metadata jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);
