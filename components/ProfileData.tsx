
import ProfileCard from "./ProfileCard";
import { CardProfile } from "@/app/lib/profiles";

interface ProfileDataProps {
  profiles?: CardProfile[];
}

const ProfileData = ({ profiles = [] }: ProfileDataProps) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default ProfileData;