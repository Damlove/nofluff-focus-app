// Located at: src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/services/supabase/client';
import { signInWithEmail as serviceSignIn, signUpWithEmail as serviceSignUp, signOut as serviceSignOut } from '@/services/auth';
import { User } from '@supabase/supabase-js';

// Import the Credentials type we created in our service file.
type Credentials = Parameters<typeof serviceSignUp>[0];

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  signInWithEmail: (credentials: Credentials) => Promise<{ error: Error | null }>;
  signUpWithEmail: (credentials: Credentials) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
}

// 1. Create the Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Create the Provider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoadingAuth(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = async (credentials: Credentials) => {
    const { error } = await serviceSignIn(credentials);
    return { error };
  };

  const signUpWithEmail = async (credentials: Credentials) => {
    const { error } = await serviceSignUp(credentials);
    return { error };
  };

  const signOut = async () => {
    const { error } = await serviceSignOut();
    return { error };
  };
  
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoadingAuth,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create the Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
