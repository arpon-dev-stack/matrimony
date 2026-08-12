"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getFilteredProfiles, GetUsers, Search } from "./profiles";

export const useSearch = () => {
  const params = useSearchParams();
  const [searchResult, setSearchResult] = useState<GetUsers>(
    {users: [], count: null}
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
  const page = params.get("page") ?? undefined;

  useEffect(() => {
    let isCanceled = false;

    const executeSearch = async (searchParams: Search) => {
      try {
        setIsLoading(true);
        setError(undefined);

        const res = await getFilteredProfiles(searchParams);

        if (isCanceled) return;

        if (!res || res.users.length === 0) {
          setError("No users found");
          setSearchResult({users: [], count: null});
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
      page
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
    page
  ]);

  return { isLoading, error, searchResult };
};