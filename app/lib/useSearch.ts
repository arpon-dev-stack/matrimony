"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getFilteredProfiles, CardProfile } from "./profiles";

export interface Search {
  looking_for: string | undefined;
  min_age: string | undefined;
  max_age: string | undefined;
  location: string | undefined;
  religion: string | undefined;
  education: string | undefined;
  interests: string | undefined;
  name: string | undefined;
}

export const useSearch = () => {
  const params = useSearchParams();
  const [searchResult, setSearchResult] = useState<CardProfile[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const looking_for = params.get("looking_for") ?? undefined;
  const min_age = params.get("min_age") ?? undefined;
  const max_age = params.get("max_age") ?? undefined;
  const location = params.get("location") ?? undefined;
  const religion = params.get("religion") ?? undefined;
  const education = params.get("education") ?? undefined;
  const interests = params.get("interests") ?? undefined;
  const name = params.get("name") ?? undefined;

  useEffect(() => {
    let isCanceled = false;

    const executeSearch = async (searchParams: Search) => {
      try {
        setIsLoading(true);
        setError(undefined);

        const res = await getFilteredProfiles(searchParams);

        if (isCanceled) return;

        if (!res || res.length === 0) {
          setError("No users found");
          setSearchResult([]);
        } else {
          setSearchResult(res);
        }
      } catch (err) {
        if (!isCanceled) {
          setError(
            "Try again: " + (err instanceof Error ? err.message : String(err))
          );
        }
      } finally {
        if (!isCanceled) {
          setIsLoading(false);
        }
      }
    };

    executeSearch({
      looking_for,
      min_age,
      max_age,
      location,
      religion,
      education,
      interests,
      name,
    });

    return () => {
      isCanceled = true;
    };
  }, [
    looking_for,
    min_age,
    max_age,
    location,
    religion,
    education,
    interests,
    name,
  ]);

  return { isLoading, error, searchResult };
};