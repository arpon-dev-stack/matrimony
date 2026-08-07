'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, AuthUser } from '../types/auth';
import { refreshTokenAction } from '../actions/refreshTokenAction';
import { signOutAction } from '../actions/signOutAction'; // Import signout server action

export type AuthContextType = {
  user: User | undefined;
  accessToken: string | undefined;
  isLoading: boolean;
  signIn: (data: AuthUser) => void;
  signOut: () => Promise<void>; // Updated to Promise<void>
  getValidToken: () => Promise<string | undefined>;
  updateUser: (updatedFields: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
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
        setAccessToken(undefined);
        setUser(undefined);
        return null;
      }
    } catch (err) {
      console.error("Session refresh failed", err);
      setAccessToken(undefined);
      setUser(undefined);
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

  const getValidToken = useCallback(async (): Promise<string | undefined> => {
    if (accessToken) {
      return accessToken;
    }
    return await refreshSession();
  }, [accessToken, refreshSession]);

  const signIn = useCallback((data: AuthUser) => {
    setUser(data.user);
    setAccessToken(data.token);
  }, []);

  // Clear DB token, delete cookie, then clear client memory
  const signOut = useCallback(async () => {
    try {
      await signOutAction();
    } catch (error) {
      console.error("Sign out action error:", error);
    } finally {
      setUser(undefined);
      setAccessToken(undefined);
    }
  }, []);

  const updateUser = useCallback((updatedFields: User) => {
    setUser((prevUser: User | undefined) => ({
      ...prevUser,
      ...updatedFields,
    }));
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        signIn,
        signOut,
        getValidToken,
        updateUser
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