import React, { createContext, useContext, useState } from 'react';

// 1. Create the Context
const MilestoneContext = createContext<any>(undefined);

// 2. Create the Provider Component
export const MilestoneProvider = ({ children }: { children: React.ReactNode }) => {
  const [allMilestones, setAllMilestones] = useState([]);
  const [userMilestones, setUserMilestones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllMilestones = async () => {
    // Logic to fetch from Supabase 'milestones' table
  };

  const fetchUserMilestones = async () => {
    // Logic to fetch from Supabase 'user_milestones' table
  };
  
  const value = {
    allMilestones,
    userMilestones,
    isLoading,
    fetchAllMilestones,
    fetchUserMilestones,
  };

  return <MilestoneContext.Provider value={value}>{children}</MilestoneContext.Provider>;
};

// 3. Create the Custom Hook
export const useMilestones = () => {
  const context = useContext(MilestoneContext);
  if (context === undefined) {
    throw new Error('useMilestones must be used within a MilestoneProvider');
  }
  return context;
};
