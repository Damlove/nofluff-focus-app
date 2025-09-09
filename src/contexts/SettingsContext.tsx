import React, { createContext, useContext, useState } from 'react';

// 1. Create the Context
const SettingsContext = createContext<any>(undefined);

// 2. Create the Provider Component
export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState({
    sarcasm_level: 3, // Default to medium
    essay_gate_enabled: true,
    primary_focus_goal: null,
    onboarding_complete: false,
    // Add other settings from context.md with their defaults here
  });

  const updateSettings = (newSettings: any) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    // We will add a call to save these to Supabase later
  };
  
  const value = {
    settings,
    updateSettings,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

// 3. Create the Custom Hook
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
