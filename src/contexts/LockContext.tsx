import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

interface LockState {
  isLocked: boolean;
  isBlocking: boolean;
  blockedApps: string[];
  sessionId: string | null;
  lockStartTime: Date | null;
  unlockAttempts: number;
  maxUnlockAttempts: number;
}

interface LockContextType {
  lockState: LockState;
  lockApps: (apps: string[], sessionId: string) => Promise<void>;
  unlockApps: () => Promise<void>;
  addUnlockAttempt: () => void;
  resetUnlockAttempts: () => void;
  isAppBlocked: (bundleId: string) => boolean;
  getRemainingUnlockAttempts: () => number;
}

const LockContext = createContext<LockContextType | undefined>(undefined);

export const LockProvider = ({ children }: { children: React.ReactNode }) => {
  const [lockState, setLockState] = useState<LockState>({
    isLocked: false,
    isBlocking: false,
    blockedApps: [],
    sessionId: null,
    lockStartTime: null,
    unlockAttempts: 0,
    maxUnlockAttempts: 3,
  });

  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // App came to foreground - check if we should show blocking screen
        if (lockState.isLocked && lockState.isBlocking) {
          // TODO: Show app blocking screen
          console.log('App came to foreground during focus session');
        }
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [appState, lockState.isLocked, lockState.isBlocking]);

  const lockApps = async (apps: string[], sessionId: string) => {
    try {
      setLockState(prev => ({
        ...prev,
        isLocked: true,
        isBlocking: true,
        blockedApps: apps,
        sessionId,
        lockStartTime: new Date(),
        unlockAttempts: 0,
      }));

      // TODO: Implement actual app blocking using Screen Time API
      console.log('Locking apps:', apps, 'for session:', sessionId);
      
      // For now, just log the blocking action
      // In a real implementation, this would:
      // 1. Use Screen Time API to block apps
      // 2. Set up app state monitoring
      // 3. Show blocking overlay when blocked apps are opened
      
    } catch (error) {
      console.error('Failed to lock apps:', error);
      setLockState(prev => ({
        ...prev,
        isLocked: false,
        isBlocking: false,
        blockedApps: [],
        sessionId: null,
        lockStartTime: null,
      }));
    }
  };

  const unlockApps = async () => {
    try {
      setLockState(prev => ({
        ...prev,
        isLocked: false,
        isBlocking: false,
        blockedApps: [],
        sessionId: null,
        lockStartTime: null,
        unlockAttempts: 0,
      }));

      // TODO: Implement actual app unlocking
      console.log('Unlocking all apps');
      
    } catch (error) {
      console.error('Failed to unlock apps:', error);
    }
  };

  const addUnlockAttempt = () => {
    setLockState(prev => ({
      ...prev,
      unlockAttempts: prev.unlockAttempts + 1,
    }));
  };

  const resetUnlockAttempts = () => {
    setLockState(prev => ({
      ...prev,
      unlockAttempts: 0,
    }));
  };

  const isAppBlocked = (bundleId: string): boolean => {
    return lockState.isLocked && lockState.blockedApps.includes(bundleId);
  };

  const getRemainingUnlockAttempts = (): number => {
    return Math.max(0, lockState.maxUnlockAttempts - lockState.unlockAttempts);
  };

  const value: LockContextType = {
    lockState,
    lockApps,
    unlockApps,
    addUnlockAttempt,
    resetUnlockAttempts,
    isAppBlocked,
    getRemainingUnlockAttempts,
  };

  return <LockContext.Provider value={value}>{children}</LockContext.Provider>;
};

export const useLock = () => {
  const context = useContext(LockContext);
  if (context === undefined) {
    throw new Error('useLock must be used within a LockProvider');
  }
  return context;
};
