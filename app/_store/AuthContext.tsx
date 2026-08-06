'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User } from '../types/auth';
import { refreshTokenAction } from '../actions/refreshTokenAction';

export type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  signIn: (user: User, token: string) => void;
  signOut: () => void;
  getValidToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper to handle refresh logic
  const refreshSession = useCallback(async () => {
    try {
      const res = await refreshTokenAction();
      if (res.success && res.token && res.user) {
        setAccessToken(res.token);
        setUser(res.user);
        return res.token;
      } else {
        setAccessToken(null);
        setUser(null);
        return null;
      }
    } catch (err) {
      console.error("Session refresh failed", err);
      setAccessToken(null);
      setUser(null);
      return null;
    }
  }, []);

  // Initial session restoration on load/refresh
  useEffect(() => {
    let isMounted = true;
    async function restoreSession() {
      await refreshSession();
      if (isMounted) setIsLoading(false);
    }
    restoreSession();
    return () => { isMounted = false; };
  }, [refreshSession]);

  // Call this function before making any authenticated API requests
  const getValidToken = useCallback(async (): Promise<string | null> => {
    if (accessToken) {
      // Optional: Check JWT expiration locally using jwt-decode before returning.
      // If expired, fall through to refreshSession().
      return accessToken;
    }
    return await refreshSession();
  }, [accessToken, refreshSession]);

  const signIn = useCallback((data: {user: User, token: string}) => {
    setUser(data.user);
    setAccessToken(data.token);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    setAccessToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        signIn,
        signOut,
        getValidToken,
      }}
    >
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