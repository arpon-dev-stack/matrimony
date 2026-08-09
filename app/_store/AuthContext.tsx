'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
// import { User} from '../types/auth';
import { refreshTokenAction } from '../actions/refreshTokenAction';
import { signOutAction } from '../actions/signOutAction'; // Import signout server action

export type AuthContextType = {
  id: number | null;
  token: string | null;
  isLoading: boolean;
  signIn: (data: {id: number, token: string}) => void;
  signOut: () => Promise<void>; // Updated to Promise<void>
  getValidToken: () => Promise<string | undefined>;
  // updateUser: (updatedFields: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper to handle refresh logic
  const refreshSession = useCallback(async () => {
    try {
      const res = await refreshTokenAction();
      if (res.success && res.token && res.id) {
        setToken(res.token);
        setId(res.id);
        return res.token;
      } else {
        setToken(null);
        setId(null);
        return null;
      }
    } catch (err) {
      console.error("Session refresh failed", err);
      setToken(null);
      setId(null);
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
    if (token) {
      return token;
    }
    return await refreshSession();
  }, [token, refreshSession]);

  const signIn = useCallback((data: {id: number, token: string}) => {
    setId(data.id);
    setToken(data.token);
  }, []);

  // Clear DB token, delete cookie, then clear client memory
  const signOut = useCallback(async () => {
    try {
      await signOutAction();
    } catch (error) {
      console.error("Sign out action error:", error);
    } finally {
      setId(null);
      setToken(null);
    }
  }, []);

  // const updateUser = useCallback((updatedFields: User) => {
  //   setId((prevUser: User | undefined) => ({
  //     ...prevUser,
  //     ...updatedFields,
  //   }));
  // }, [])

  return (
    <AuthContext.Provider
      value={{
        id,
        token,
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