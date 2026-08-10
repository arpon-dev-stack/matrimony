"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getFilteredProfiles } from "./profiles";
import { CardProfile } from "./profiles";

interface Search {
  lookingFor: string | undefined;
  ageRange: string | undefined;
  location: string | undefined;
  religion: string | undefined;
  education: string | undefined;
  interests: string | undefined;
  name: string | undefined;
}

export const useSearch = () => {
  const params = useSearchParams();
  const [searchResult, setSearchResult] = useState<CardProfile[] | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const lookingFor: string | undefined = params.get("lookingfor") ?? undefined;
  const ageRange: string | undefined = params.get("age_range") ?? undefined;
  const location: string | undefined = params.get("location") ?? undefined;
  const religion: string | undefined = params.get("religion") ?? undefined;
  const education: string | undefined = params.get("education") ?? undefined;
  const interests: string | undefined = params.get("interests") ?? undefined;
  const name: string | undefined = params.get("name") ?? undefined;

  useEffect(() => {
    let is_cancled = false;
    const search = async (search: Search) => {
      try {
        setIsLoading(true);
        const res = await getFilteredProfiles(search);

        if (!res) {
          setError("No User found");
          setIsLoading(false);
        }
        if (!is_cancled) {
          setSearchResult(res);
        }
        setIsLoading(false);
      } catch (err) {
        setError("No User Found");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    search({ lookingFor, ageRange, location, religion, education, interests, name });

    return () => {
      is_cancled = true;
    };
  }, [lookingFor, ageRange, location, religion, education, interests, name]);

  return {isLoading, error, searchResult};
};
