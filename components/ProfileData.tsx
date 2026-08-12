"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ProfileCard from "./ProfileCard";
import { getFilteredProfiles, Search, CardProfile } from "@/app/lib/profiles";
import { ProfileSkeletonGrid } from "@/components/SearchResultSkeleton";

const LIMIT = 20;

const ProfileData = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [profiles, setProfiles] = useState<CardProfile[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);

      const paramsObj: Search = {
        looking_for: searchParams.get("looking_for") ?? undefined,
        min_age: searchParams.get("min_age") ?? undefined,
        max_age: searchParams.get("max_age") ?? undefined,
        location: searchParams.get("location") ?? undefined,
        religion: searchParams.get("religion") ?? undefined,
        education: searchParams.get("education") ?? undefined,
        interests: searchParams.get("interests") ?? undefined,
        name: searchParams.get("name") ?? undefined,
        page: String(currentPage),
      };

      try {
        const { users = [], count: totalCount } = await getFilteredProfiles(paramsObj);
        console.log(totalCount);
        setProfiles(users);
        setCount(totalCount);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [searchParams, currentPage]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (loading) {
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

  return (
    <>
      <p className="text-[#43474e] text-sm md:text-base mb-10">
        {totalMatches} curated matches found based on your preferences
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>

      {showPagination && (
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-[#c4c6cf]/30">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-5 py-2.5 rounded-lg border border-[#c4c6cf] text-sm font-medium text-[#000d22] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#775a19] transition-colors"
          >
            Previous
          </button>

          <span className="text-sm text-[#43474e] font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
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