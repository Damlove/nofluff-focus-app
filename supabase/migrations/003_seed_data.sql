-- Insert default milestones
INSERT INTO milestones (name, description, type, target_value, icon_name, color) VALUES
('First Focus', 'Complete your first focus session', 'sessions_completed', 1, 'trophy', '#D1FF1A'),
('Focus Warrior', 'Complete 5 focus sessions', 'sessions_completed', 5, 'shield', '#FF6B6B'),
('Focus Master', 'Complete 25 focus sessions', 'sessions_completed', 25, 'crown', '#4ECDC4'),
('Time Saver', 'Focus for 10 hours total', 'focus_time', 600, 'clock', '#45B7D1'),
('Time Master', 'Focus for 50 hours total', 'focus_time', 3000, 'star', '#96CEB4'),
('Streak Starter', 'Complete 3 sessions in a row', 'streak', 3, 'flame', '#FFEAA7'),
('Streak Master', 'Complete 10 sessions in a row', 'streak', 10, 'fire', '#DDA0DD'),
('Distraction Fighter', 'Block 100 distracting apps', 'custom', 100, 'shield-alt', '#98D8C8'),
('Essay Writer', 'Write 10 commitment essays', 'custom', 10, 'pen', '#F7DC6F'),
('Week Warrior', 'Complete 7 sessions in one week', 'custom', 7, 'calendar-week', '#BB8FCE');

-- Create a function to automatically create user settings when a profile is created
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO settings (user_id)
  VALUES (NEW.id);
  
  -- Create user milestones for all active milestones
  INSERT INTO user_milestones (user_id, milestone_id)
  SELECT NEW.id, id FROM milestones WHERE is_active = true;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create settings and milestones for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
