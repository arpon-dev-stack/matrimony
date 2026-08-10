import { PrimaryGoldButton } from "../buttons/PrimaryColdenButton";
import { SecondaryOutlineButton } from "../buttons/SecondaryOutlineButton";

import { Heart, Mail } from "lucide-react";
const ProfileAction = () => {
  const handlePrimaryButton = () => {};

  const handleSecondaryButton = () => {};

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-md">
      <PrimaryGoldButton
        className="py-3 px-6 flex-1 text-sm font-semibold flex items-center justify-center gap-2"
        onClick={handlePrimaryButton}
      >
        <Heart className="w-4 h-4 fill-current" />
        Send Interest
      </PrimaryGoldButton>
      <SecondaryOutlineButton onClick={handleSecondaryButton} className="py-3 px-6 flex-1 text-sm font-semibold flex items-center justify-center gap-2">
        <Mail className="w-4 h-4" />
        Message
      </SecondaryOutlineButton>
    </div>
  );
};

export default ProfileAction;
