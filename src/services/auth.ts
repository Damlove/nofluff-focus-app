// Located at: src/services/auth.ts

import { supabase } from '@/services/supabase/client';

// This is the robust way to get the type for credentials.
// It asks TypeScript: "What is the type of the first argument of the signUp function?"
type Credentials = Parameters<typeof supabase.auth.signUp>[0];

/**
 * Sign up a new user with email and password.
 */
export const signUpWithEmail = async (credentials: Credentials) => {
  const { data, error } = await supabase.auth.signUp(credentials);
  return { data, error };
};

/**
 * Sign in an existing user with email and password.
 */
export const signInWithEmail = async (credentials: Credentials) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  return { data, error };
};

/**
 * Sign out the current user.
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};