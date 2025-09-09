import React, { createContext, useContext, useState } from 'react';

// 1. Create the Context
const SessionContext = createContext<any>(undefined);

// 2. Create the Provider Component
export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSession, setActiveSession] = useState(null); // null when no session, or an object with session details when active
  const [isPaused, setIsPaused] = useState(false);

  const startSession = (sessionDetails: any) => {
    setActiveSession(sessionDetails);
    setIsPaused(false);
  };

  const endSession = () => {
    setActiveSession(null);
    setIsPaused(false);
  };
  
  const togglePause = () => {
    setIsPaused(prev => !prev);
  };
  
  const value = {
    activeSession,
    isPaused,
    startSession,
    endSession,
    togglePause,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

// 3. Create the Custom Hook
export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
