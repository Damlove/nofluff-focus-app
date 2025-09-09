-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  age INTEGER,
  history_quit TEXT[],
  previous_apps TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  estimated_daily_loss INTEGER DEFAULT 180, -- minutes
  primary_time_waster TEXT,
  primary_focus_goal TEXT,
  sarcasm_level INTEGER DEFAULT 3 CHECK (sarcasm_level >= 1 AND sarcasm_level <= 5),
  just_one_more_frequency INTEGER DEFAULT 3 CHECK (just_one_more_frequency >= 1 AND just_one_more_frequency <= 5),
  essay_gate_enabled BOOLEAN DEFAULT true,
  onboarding_complete BOOLEAN DEFAULT false,
  push_notifications_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create focus_sessions table
CREATE TABLE focus_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  total_focus_time INTEGER DEFAULT 0, -- actual focus time in minutes
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'active', 'completed', 'failed', 'cancelled')),
  app_limits JSONB DEFAULT '[]', -- array of app bundle IDs to block
  app_lock_enabled BOOLEAN DEFAULT false,
  essay_required BOOLEAN DEFAULT true,
  essay_content TEXT,
  essay_word_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create failure_logs table
CREATE TABLE failure_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  session_id UUID REFERENCES focus_sessions(id) ON DELETE CASCADE,
  failure_type TEXT NOT NULL CHECK (failure_type IN ('app_opened', 'session_abandoned', 'essay_skipped', 'time_limit_exceeded')),
  app_bundle_id TEXT,
  app_name TEXT,
  failure_reason TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create milestones table
CREATE TABLE milestones (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('focus_time', 'sessions_completed', 'streak', 'custom')),
  target_value INTEGER NOT NULL,
  icon_name TEXT,
  color TEXT DEFAULT '#D1FF1A',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_milestones table
CREATE TABLE user_milestones (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES milestones(id) ON DELETE CASCADE,
  achieved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress_value INTEGER DEFAULT 0,
  is_achieved BOOLEAN DEFAULT false,
  UNIQUE(user_id, milestone_id)
);

-- Create devices table for push notifications
CREATE TABLE devices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('ios', 'android', 'web')),
  push_token TEXT,
  onesignal_player_id TEXT,
  is_active BOOLEAN DEFAULT true,
  last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, device_id)
);

-- Create app_usage_logs table
CREATE TABLE app_usage_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  session_id UUID REFERENCES focus_sessions(id) ON DELETE CASCADE,
  app_bundle_id TEXT NOT NULL,
  app_name TEXT NOT NULL,
  usage_duration INTEGER NOT NULL, -- seconds
  opened_at TIMESTAMP WITH TIME ZONE NOT NULL,
  closed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_focus_sessions_user_id ON focus_sessions(user_id);
CREATE INDEX idx_focus_sessions_status ON focus_sessions(status);
CREATE INDEX idx_focus_sessions_scheduled_at ON focus_sessions(scheduled_at);
CREATE INDEX idx_failure_logs_user_id ON failure_logs(user_id);
CREATE INDEX idx_failure_logs_session_id ON failure_logs(session_id);
CREATE INDEX idx_user_milestones_user_id ON user_milestones(user_id);
CREATE INDEX idx_devices_user_id ON devices(user_id);
CREATE INDEX idx_app_usage_logs_user_id ON app_usage_logs(user_id);
CREATE INDEX idx_app_usage_logs_session_id ON app_usage_logs(session_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_focus_sessions_updated_at BEFORE UPDATE ON focus_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
