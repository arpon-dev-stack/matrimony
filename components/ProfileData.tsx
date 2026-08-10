// components/ProfileData.tsx

import ProfileCard from "./ProfileCard";
import { CardProfile } from "@/app/lib/profiles";

interface ProfileDataProps {
  profiles?: CardProfile[];
  isLoading?: boolean;
}

const ProfileData = ({ profiles = [], isLoading = false }: ProfileDataProps) => {

  console.log(profiles);

  // 1. Loading State
  if (isLoading) {
    return <ProfileSkeletonGrid />;
  }

  // 2. Empty State
  if (profiles.length === 0) {
    return (
      <div className="p-12 text-center text-[#43474e]">
        <p className="text-lg font-medium">No profiles match your search criteria.</p>
        <p className="text-sm mt-1">Try adjusting your filters to broaden your search.</p>
      </div>
    );
  }

  // 3. Data State
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

// Skeleton Loader Component
function ProfileSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-[#e1e2e1] overflow-hidden p-5 space-y-4 animate-pulse"
        >
          {/* Profile Image Skeleton */}
          <div className="w-full h-64 bg-[#e8eaed] rounded-xl" />

          {/* Title & Location Skeleton */}
          <div className="space-y-2 pt-1">
            <div className="h-6 bg-[#e8eaed] rounded-md w-2/3" />
            <div className="h-4 bg-[#e8eaed] rounded-md w-1/3" />
          </div>

          {/* Details / Meta Skeleton */}
          <div className="space-y-2 pt-2">
            <div className="h-4 bg-[#e8eaed] rounded-md w-5/6" />
            <div className="h-4 bg-[#e8eaed] rounded-md w-4/6" />
          </div>

          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-2 pt-3">
            <div className="h-6 w-16 bg-[#e8eaed] rounded-full" />
            <div className="h-6 w-20 bg-[#e8eaed] rounded-full" />
            <div className="h-6 w-14 bg-[#e8eaed] rounded-full" />
          </div>

          {/* Action Button Skeleton */}
          <div className="pt-2">
            <div className="h-10 w-full bg-[#e8eaed] rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfileData;