// components/ProfileData.tsx

import ProfileCard from "./ProfileCard";
import { CardProfile } from "@/app/lib/profiles";

interface ProfileDataProps {
  profiles: CardProfile[];
}

const ProfileData = ({ profiles }: ProfileDataProps) => {
  if (profiles.length === 0) {
    return (
      <div className="p-12 text-center text-[#43474e]">
        <p className="text-lg font-medium">No profiles match your search criteria.</p>
        <p className="text-sm mt-1">Try adjusting your filters to broaden your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default ProfileData;