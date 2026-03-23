-- Postgres Schema for Tution LMS (Supabase)
-- Run this in the Supabase SQL Editor to Reset Database

-- 1. Drop Tables (Clean Slate)
DROP TABLE IF EXISTS student_packs CASCADE;
DROP TABLE IF EXISTS pack_videos CASCADE;
DROP TABLE IF EXISTS video_packs CASCADE;
DROP TABLE IF EXISTS user_approvals CASCADE;
DROP TABLE IF EXISTS videos CASCADE; -- Cleaning up old table if exists

-- 2. User Approvals (Profiles)
CREATE TABLE user_approvals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- link to Auth
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'student', -- 'student' or 'admin' or 'teacher'
  is_approved BOOLEAN DEFAULT false,
  is_suspended BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Video Packs (Bundles/Batches)
CREATE TABLE video_packs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Pack Videos (Lessons inside a pack)
CREATE TABLE pack_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pack_id UUID REFERENCES video_packs(id) ON DELETE CASCADE, -- Cascade delete is CRITICAL
  title TEXT NOT NULL,
  description TEXT,
  youtube_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Student Packs (Assignments)
CREATE TABLE student_packs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL, -- Application uses email to link
  pack_id UUID REFERENCES video_packs(id) ON DELETE CASCADE, -- Cascade delete is CRITICAL
  assigned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_email, pack_id) -- Prevent duplicate assignments
);

-- 6. Enable Row Level Security (RLS) - Optional/Recommended
-- ALTER TABLE user_approvals ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE video_packs ENABLE ROW LEVEL SECURITY;
-- ... (policies can be added later)
