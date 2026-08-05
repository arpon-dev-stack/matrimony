'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { UserProfile } from '../types/auth';

export type AuthContextType = {
  user: UserProfile | null;
  signIn: (userData: UserProfile) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  // Memoize signIn so its reference remains stable across re-renders
  const signIn = useCallback((userData: UserProfile) => {
    setUser({ ...userData, isAuthenticated: true });
  }, []);

  // Memoize signOut
  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}