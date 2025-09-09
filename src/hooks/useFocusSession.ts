import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/services/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLock } from '@/contexts/LockContext';
import { FocusSession, FocusSessionInsert, FocusSessionUpdate } from '@/types/database';

interface UseFocusSessionReturn {
  activeSession: FocusSession | null;
  isLoading: boolean;
  error: string | null;
  startSession: (sessionData: Omit<FocusSessionInsert, 'user_id'>) => Promise<boolean>;
  endSession: (sessionId: string, success: boolean) => Promise<void>;
  pauseSession: (sessionId: string) => Promise<void>;
  resumeSession: (sessionId: string) => Promise<void>;
  updateSessionProgress: (sessionId: string, focusTime: number) => Promise<void>;
  logFailure: (sessionId: string, failureType: string, metadata?: any) => Promise<void>;
}

export const useFocusSession = (): UseFocusSessionReturn => {
  const { user } = useAuth();
  const { lockApps, unlockApps } = useLock();
  const [activeSession, setActiveSession] = useState<FocusSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for active session on mount
  useEffect(() => {
    if (user) {
      checkActiveSession();
    }
  }, [user]);

  const checkActiveSession = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('focus_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      if (data) {
        setActiveSession(data);
      }
    } catch (err) {
      console.error('Error checking active session:', err);
      setError('Failed to check active session');
    } finally {
      setIsLoading(false);
    }
  };

  const startSession = async (sessionData: Omit<FocusSessionInsert, 'user_id'>): Promise<boolean> => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Create session in database
      const sessionInsert: FocusSessionInsert = {
        ...sessionData,
        user_id: user.id,
        status: 'active',
        started_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('focus_sessions')
        .insert(sessionInsert)
        .select()
        .single();

      if (error) throw error;

      setActiveSession(data);

      // Lock apps if specified
      if (sessionData.app_limits && sessionData.app_limits.length > 0) {
        await lockApps(sessionData.app_limits, data.id);
      }

      return true;
    } catch (err) {
      console.error('Error starting session:', err);
      setError('Failed to start session');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const endSession = async (sessionId: string, success: boolean): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const updateData: FocusSessionUpdate = {
        status: success ? 'completed' : 'failed',
        ended_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('focus_sessions')
        .update(updateData)
        .eq('id', sessionId);

      if (error) throw error;

      // Unlock apps
      await unlockApps();

      setActiveSession(null);
    } catch (err) {
      console.error('Error ending session:', err);
      setError('Failed to end session');
    } finally {
      setIsLoading(false);
    }
  };

  const pauseSession = async (sessionId: string): Promise<void> => {
    try {
      // For now, we'll just log the pause
      // In a full implementation, you might want to track pause duration
      console.log('Session paused:', sessionId);
    } catch (err) {
      console.error('Error pausing session:', err);
      setError('Failed to pause session');
    }
  };

  const resumeSession = async (sessionId: string): Promise<void> => {
    try {
      // For now, we'll just log the resume
      // In a full implementation, you might want to track pause duration
      console.log('Session resumed:', sessionId);
    } catch (err) {
      console.error('Error resuming session:', err);
      setError('Failed to resume session');
    }
  };

  const updateSessionProgress = async (sessionId: string, focusTime: number): Promise<void> => {
    try {
      const { error } = await supabase
        .from('focus_sessions')
        .update({ total_focus_time: focusTime })
        .eq('id', sessionId);

      if (error) throw error;

      // Update local state
      setActiveSession(prev => 
        prev ? { ...prev, total_focus_time: focusTime } : null
      );
    } catch (err) {
      console.error('Error updating session progress:', err);
      setError('Failed to update session progress');
    }
  };

  const logFailure = async (sessionId: string, failureType: string, metadata: any = {}): Promise<void> => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('failure_logs')
        .insert({
          user_id: user.id,
          session_id: sessionId,
          failure_type: failureType,
          metadata,
        });

      if (error) throw error;
    } catch (err) {
      console.error('Error logging failure:', err);
      setError('Failed to log failure');
    }
  };

  return {
    activeSession,
    isLoading,
    error,
    startSession,
    endSession,
    pauseSession,
    resumeSession,
    updateSessionProgress,
    logFailure,
  };
};
