import ProfileCard from "./ProfileCard";
import { useSearch } from "@/app/lib/useSearch";
import { ProfileSkeletonGrid } from "@/components/SearchResultSkeleton"; // adjust path as needed

const ProfileData = () => {
  const { isLoading, searchResult: profiles = [] } = useSearch();

  if (isLoading) {
    return <ProfileSkeletonGrid />;
  }

  return (
    <>
      <p className="text-[#43474e] text-sm md:text-base mb-10">
        {profiles?.length ?? 0} curated matches found based on your preferences
      </p>

      {profiles?.length === 0 && isLoading ? (
        <div className="col-span-full p-12 text-center text-[#43474e]">
          <p className="text-lg font-medium">
            No profiles match your search criteria.
          </p>
          <p className="text-sm mt-1">
            Try adjusting your filters to broaden your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProfileData;