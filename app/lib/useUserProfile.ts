import { useState, useEffect, useCallback } from "react";
import { getProfile, UserRow } from "@/app/lib/profiles";

interface UseUserProfileReturn {
  user: UserRow | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUserProfile(id: number | undefined): UseUserProfileReturn {
  const [user, setUser] = useState<UserRow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // Keep track of which ID was successfully loaded to derive loading status on re-render
  const [fetchedId, setFetchedId] = useState<number | undefined>(undefined);

  // Manual refetch function
  const refetch = useCallback(async () => {
    if (id === null || id === undefined) return;

    setIsFetching(true);
    setError(null);

    try {
      const profile = await getProfile(id);
      if (!profile) {
        setError("Try again");
        setUser(null);
      } else {
        setUser(profile);
      }
    } catch (err) {
      setError("Try again: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsFetching(false);
    }
  }, [id]);

  useEffect(() => {
    if (id === null || id === undefined) return;

    let isCanceled = false;

    async function loadProfile() {
      // 1. Move state updates inside the async function microtask
      try {
        const profile = await getProfile(id as number);

        if (isCanceled) return;

        if (!profile) {
          setError("Try again");
          setUser(null);
        } else {
          setUser(profile);
          setError(null);
        }
      } catch (err) {
        if (!isCanceled) {
          setError("Try again: " + (err instanceof Error ? err.message : String(err)));
        }
      } finally {
        if (!isCanceled) {
          setFetchedId(id);
          setIsFetching(false);
        }
      }
    }

    loadProfile();

    return () => {
      isCanceled = true;
    };
  }, [id]);

  // Derived state: loading if an ID exists but hasn't finished fetching yet
  const isLoading = id !== null && id !== undefined && (fetchedId !== id || isFetching);

  return {
    user,
    isLoading,
    error,
    refetch,
  };
}