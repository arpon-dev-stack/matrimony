import { useState, useEffect } from "react";
import { getProfile, UserRow } from "@/app/lib/profiles";

interface UseUserProfileReturn {
  user: UserRow | null;
  isLoading: boolean;
  error: string | null;
}

export function useUserProfile(id: number): UseUserProfileReturn {
  const [user, setUser] = useState<UserRow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id === null || id === undefined) return;

    let isCanceled = false;

    async function loadProfile() {
      // 1. Move state updates inside the async function microtask
      try {
        setIsLoading(true);
        const profile = await getProfile(id as number);

        if (isCanceled) {
          setIsLoading(false);
          return;
        }

        if (!profile) {
          setError("Try again");
          setUser(null);
          setIsLoading(false);
        } else {
          setUser(profile);
          setError(null);
          setIsLoading(false);
        }
      } catch (err) {
        if (!isCanceled) {
          setError(
            "Try again: " + (err instanceof Error ? err.message : String(err)),
          );
          setIsLoading(false);
        }
      } finally {
        if (!isCanceled) {
          setIsLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      isCanceled = true;
    };
  }, [id]);

  // Derived state: loading if an ID exists but hasn't finished fetching yet
  return {
    user,
    isLoading,
    error,
  };
}
