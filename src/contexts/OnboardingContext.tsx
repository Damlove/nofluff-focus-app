import React, { createContext, useContext, useState } from 'react';

// 1. Create the Context
const OnboardingContext = createContext<any>(undefined);

// 2. Create the Provider Component
export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState({});

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const updateOnboardingData = (newData: any) => {
    setOnboardingData(prev => ({ ...prev, ...newData }));
  };
  
  const value = {
    currentStep,
    onboardingData,
    nextStep,
    prevStep,
    updateOnboardingData,
  };

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
};

// 3. Create the Custom Hook
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
