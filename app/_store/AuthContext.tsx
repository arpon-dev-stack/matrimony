"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { refreshTokenAction } from "../actions/refreshTokenAction";
import { signOutAction } from "../actions/signOutAction"; // Import signout server action
import { AuthObject, AuthUserGlobalState } from "../types/auth";

export type AuthContextType = {
  user: AuthUserGlobalState | null;
  token: string | null;
  isLoading: boolean;
  signIn: (data: { id: number; token: string; profile: string | null }) => void;
  signOut: () => Promise<void>; // Updated to Promise<void>
  getValidToken: () => Promise<string | undefined>;
  // updateUser: (updatedFields: User) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUserGlobalState | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper to handle refresh logic
  const refreshSession = useCallback(async () => {
    try {
      const res = await refreshTokenAction();
      if (res.success && res.token && res.id !== null && res.id !== undefined) {
        setToken(res.token);
        setUser({ id: res.id, profile: res.profile });
        return res.token;
      } else {
        setToken(null);
        setUser(null);
        return null;
      }
    } catch (err) {
      console.error("Session refresh failed", err);
      setToken(null);
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
    return () => {
      isMounted = false;
    };
  }, [refreshSession]);

  const getValidToken = useCallback(async (): Promise<string | undefined> => {
    if (token) {
      return token;
    }
    return await refreshSession();
  }, [token, refreshSession]);

  const signIn = useCallback((data: AuthObject) => {
    if (data.token && data.id !== null && data.id !== undefined) {
      setUser({ id: data.id, profile: data.profile });
      setToken(data.token);
    }
  }, []);

  // Clear DB token, delete cookie, then clear client memory
  const signOut = useCallback(async () => {
    try {
      await signOutAction();
    } catch (error) {
      console.error("Sign out action error:", error);
    } finally {
      setUser(null);
      setToken(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
