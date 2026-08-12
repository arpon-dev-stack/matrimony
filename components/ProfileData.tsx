"use client";

import { useEffect, useState, useTransition, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ProfileCard from "./ProfileCard";
import { getFilteredProfiles, Search, CardProfile } from "@/app/lib/profiles";
import { ProfileSkeletonGrid } from "@/components/SearchResultSkeleton";

const LIMIT = 20;

const ProfileData = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [profiles, setProfiles] = useState<CardProfile[]>([]);
  const [count, setCount] = useState<number | null>(null);

  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const searchParamsString = searchParams.toString();

  useEffect(() => {
    let isMounted = true;

    // Read query values directly inside the effect to avoid stale primitive closures
    const pageParam = Math.max(1, Number(searchParams.get("page")) || 1);

    const paramsObj: Search = {
      looking_for: searchParams.get("looking_for") ?? undefined,
      min_age: searchParams.get("min_age") ?? undefined,
      max_age: searchParams.get("max_age") ?? undefined,
      location: searchParams.get("location") ?? undefined,
      religion: searchParams.get("religion") ?? undefined,
      education: searchParams.get("education") ?? undefined,
      interests: searchParams.get("interests") ?? undefined,
      name: searchParams.get("name") ?? undefined,
      page: String(pageParam),
    };

    const fetchProfiles = async () => {
      // Functional state check avoids declaring `profiles.length` as a dependency
      setProfiles((prev) => {
        if (prev.length === 0) {
          setIsInitialLoading(true);
        } else {
          setIsFetching(true);
        }
        return prev;
      });
      try {
        const { users = [], count: totalCount } = await getFilteredProfiles(paramsObj);
        if (isMounted) {
          setProfiles(users);
          setCount(totalCount);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        if (isMounted) {
          setIsInitialLoading(false);
          setIsFetching(false);
        }
      }
    };

    fetchProfiles();

    return () => {
      isMounted = false;
    };
  }, [searchParamsString, searchParams]);

  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParamsString);
      params.set("page", String(newPage));

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: true });
      });
    },
    [searchParamsString, router, pathname]
  );

  if (isInitialLoading) {
    return <ProfileSkeletonGrid />;
  }

  if (profiles.length === 0) {
    return (
      <div className="col-span-full p-12 text-center text-[#43474e]">
        <p className="text-lg font-medium">
          No profiles match your search criteria.
        </p>
        <p className="text-sm mt-1">
          Try adjusting your filters to broaden your search.
        </p>
      </div>
    );
  }

  const totalMatches = count ?? profiles.length;
  const totalPages = Math.ceil(totalMatches / LIMIT);
  const showPagination = totalMatches > LIMIT;
  const isNavigating = isPending || isFetching;

  return (
    <>
      <p className="text-[#43474e] text-sm md:text-base mb-10">
        {totalMatches} curated matches found based on your preferences
      </p>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity duration-200 ${
          isNavigating ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>

      {showPagination && (
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-[#c4c6cf]/30">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isNavigating}
            className="px-5 py-2.5 rounded-lg border border-[#c4c6cf] text-sm font-medium text-[#000d22] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#775a19] transition-colors"
          >
            Previous
          </button>

          <span className="text-sm text-[#43474e] font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || isNavigating}
            className="px-5 py-2.5 rounded-lg border border-[#c4c6cf] text-sm font-medium text-[#000d22] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#775a19] transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default ProfileData;