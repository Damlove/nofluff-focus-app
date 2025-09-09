export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          age: number | null;
          history_quit: string[] | null;
          previous_apps: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          age?: number | null;
          history_quit?: string[] | null;
          previous_apps?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          age?: number | null;
          history_quit?: string[] | null;
          previous_apps?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      settings: {
        Row: {
          id: string;
          user_id: string;
          estimated_daily_loss: number;
          primary_time_waster: string | null;
          primary_focus_goal: string | null;
          sarcasm_level: number;
          just_one_more_frequency: number;
          essay_gate_enabled: boolean;
          onboarding_complete: boolean;
          push_notifications_enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          estimated_daily_loss?: number;
          primary_time_waster?: string | null;
          primary_focus_goal?: string | null;
          sarcasm_level?: number;
          just_one_more_frequency?: number;
          essay_gate_enabled?: boolean;
          onboarding_complete?: boolean;
          push_notifications_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          estimated_daily_loss?: number;
          primary_time_waster?: string | null;
          primary_focus_goal?: string | null;
          sarcasm_level?: number;
          just_one_more_frequency?: number;
          essay_gate_enabled?: boolean;
          onboarding_complete?: boolean;
          push_notifications_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      focus_sessions: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          duration_minutes: number;
          scheduled_at: string | null;
          started_at: string | null;
          ended_at: string | null;
          total_focus_time: number;
          status: 'scheduled' | 'active' | 'completed' | 'failed' | 'cancelled';
          app_limits: any;
          app_lock_enabled: boolean;
          essay_required: boolean;
          essay_content: string | null;
          essay_word_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          duration_minutes: number;
          scheduled_at?: string | null;
          started_at?: string | null;
          ended_at?: string | null;
          total_focus_time?: number;
          status?: 'scheduled' | 'active' | 'completed' | 'failed' | 'cancelled';
          app_limits?: any;
          app_lock_enabled?: boolean;
          essay_required?: boolean;
          essay_content?: string | null;
          essay_word_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          duration_minutes?: number;
          scheduled_at?: string | null;
          started_at?: string | null;
          ended_at?: string | null;
          total_focus_time?: number;
          status?: 'scheduled' | 'active' | 'completed' | 'failed' | 'cancelled';
          app_limits?: any;
          app_lock_enabled?: boolean;
          essay_required?: boolean;
          essay_content?: string | null;
          essay_word_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      failure_logs: {
        Row: {
          id: string;
          user_id: string;
          session_id: string | null;
          failure_type: 'app_opened' | 'session_abandoned' | 'essay_skipped' | 'time_limit_exceeded';
          app_bundle_id: string | null;
          app_name: string | null;
          failure_reason: string | null;
          metadata: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          session_id?: string | null;
          failure_type: 'app_opened' | 'session_abandoned' | 'essay_skipped' | 'time_limit_exceeded';
          app_bundle_id?: string | null;
          app_name?: string | null;
          failure_reason?: string | null;
          metadata?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          session_id?: string | null;
          failure_type?: 'app_opened' | 'session_abandoned' | 'essay_skipped' | 'time_limit_exceeded';
          app_bundle_id?: string | null;
          app_name?: string | null;
          failure_reason?: string | null;
          metadata?: any;
          created_at?: string;
        };
      };
      milestones: {
        Row: {
          id: string;
          name: string;
          description: string;
          type: 'focus_time' | 'sessions_completed' | 'streak' | 'custom';
          target_value: number;
          icon_name: string | null;
          color: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          type: 'focus_time' | 'sessions_completed' | 'streak' | 'custom';
          target_value: number;
          icon_name?: string | null;
          color?: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          type?: 'focus_time' | 'sessions_completed' | 'streak' | 'custom';
          target_value?: number;
          icon_name?: string | null;
          color?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };
      user_milestones: {
        Row: {
          id: string;
          user_id: string;
          milestone_id: string;
          achieved_at: string;
          progress_value: number;
          is_achieved: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          milestone_id: string;
          achieved_at?: string;
          progress_value?: number;
          is_achieved?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          milestone_id?: string;
          achieved_at?: string;
          progress_value?: number;
          is_achieved?: boolean;
        };
      };
      devices: {
        Row: {
          id: string;
          user_id: string;
          device_id: string;
          platform: 'ios' | 'android' | 'web';
          push_token: string | null;
          onesignal_player_id: string | null;
          is_active: boolean;
          last_seen_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          device_id: string;
          platform: 'ios' | 'android' | 'web';
          push_token?: string | null;
          onesignal_player_id?: string | null;
          is_active?: boolean;
          last_seen_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          device_id?: string;
          platform?: 'ios' | 'android' | 'web';
          push_token?: string | null;
          onesignal_player_id?: string | null;
          is_active?: boolean;
          last_seen_at?: string;
          created_at?: string;
        };
      };
      app_usage_logs: {
        Row: {
          id: string;
          user_id: string;
          session_id: string | null;
          app_bundle_id: string;
          app_name: string;
          usage_duration: number;
          opened_at: string;
          closed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          session_id?: string | null;
          app_bundle_id: string;
          app_name: string;
          usage_duration: number;
          opened_at: string;
          closed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          session_id?: string | null;
          app_bundle_id?: string;
          app_name?: string;
          usage_duration?: number;
          opened_at?: string;
          closed_at?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Type aliases for easier use
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Settings = Database['public']['Tables']['settings']['Row'];
export type FocusSession = Database['public']['Tables']['focus_sessions']['Row'];
export type FailureLog = Database['public']['Tables']['failure_logs']['Row'];
export type Milestone = Database['public']['Tables']['milestones']['Row'];
export type UserMilestone = Database['public']['Tables']['user_milestones']['Row'];
export type Device = Database['public']['Tables']['devices']['Row'];
export type AppUsageLog = Database['public']['Tables']['app_usage_logs']['Row'];

// Insert types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type SettingsInsert = Database['public']['Tables']['settings']['Insert'];
export type FocusSessionInsert = Database['public']['Tables']['focus_sessions']['Insert'];
export type FailureLogInsert = Database['public']['Tables']['failure_logs']['Insert'];
export type MilestoneInsert = Database['public']['Tables']['milestones']['Insert'];
export type UserMilestoneInsert = Database['public']['Tables']['user_milestones']['Insert'];
export type DeviceInsert = Database['public']['Tables']['devices']['Insert'];
export type AppUsageLogInsert = Database['public']['Tables']['app_usage_logs']['Insert'];

// Update types
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
export type SettingsUpdate = Database['public']['Tables']['settings']['Update'];
export type FocusSessionUpdate = Database['public']['Tables']['focus_sessions']['Update'];
export type FailureLogUpdate = Database['public']['Tables']['failure_logs']['Update'];
export type MilestoneUpdate = Database['public']['Tables']['milestones']['Update'];
export type UserMilestoneUpdate = Database['public']['Tables']['user_milestones']['Update'];
export type DeviceUpdate = Database['public']['Tables']['devices']['Update'];
export type AppUsageLogUpdate = Database['public']['Tables']['app_usage_logs']['Update'];
