-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE focus_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE failure_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_usage_logs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Settings policies
CREATE POLICY "Users can view own settings" ON settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON settings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings" ON settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Focus sessions policies
CREATE POLICY "Users can view own focus sessions" ON focus_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own focus sessions" ON focus_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own focus sessions" ON focus_sessions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own focus sessions" ON focus_sessions
  FOR DELETE USING (auth.uid() = user_id);

-- Failure logs policies
CREATE POLICY "Users can view own failure logs" ON failure_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own failure logs" ON failure_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User milestones policies
CREATE POLICY "Users can view own milestones" ON user_milestones
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own milestones" ON user_milestones
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own milestones" ON user_milestones
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Devices policies
CREATE POLICY "Users can view own devices" ON devices
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own devices" ON devices
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own devices" ON devices
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own devices" ON devices
  FOR DELETE USING (auth.uid() = user_id);

-- App usage logs policies
CREATE POLICY "Users can view own app usage logs" ON app_usage_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own app usage logs" ON app_usage_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Milestones table is public read-only
CREATE POLICY "Anyone can view milestones" ON milestones
  FOR SELECT USING (true);

-- Service role can do everything (for edge functions)
CREATE POLICY "Service role can do everything on profiles" ON profiles
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything on settings" ON settings
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything on focus_sessions" ON focus_sessions
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything on failure_logs" ON failure_logs
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything on user_milestones" ON user_milestones
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything on devices" ON devices
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything on app_usage_logs" ON app_usage_logs
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything on milestones" ON milestones
  FOR ALL USING (auth.role() = 'service_role');
