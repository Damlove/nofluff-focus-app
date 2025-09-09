// src/services/auth.ts

import { supabase } from './supabase/client';

interface AuthCredentials {
  email: string;
  password: string;
}

/**
 * Sign up a new user with email and password.
 */
export const signUpWithEmail = async (credentials: AuthCredentials) => {
  const { data, error } = await supabase.auth.signUp(credentials);
  return { data, error };
};

/**
 * Sign in an existing user with email and password.
 */
export const signInWithEmail = async (credentials: AuthCredentials) => {
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

/**
 * Get the current session.
 */
export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
};

/**
 * Get the current user.
 */
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
};