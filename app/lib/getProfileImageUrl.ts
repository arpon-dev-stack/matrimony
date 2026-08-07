export interface ImageItem {
  url: string;
  is_profile: boolean;
  is_removed: boolean;
}

export interface UserData {
  id: number;
  name: string;
  images?: ImageItem[] | null;
  [key: string]: unknown; // Accepts other user properties flexible
}

/**
 * Extracts the image URL where is_profile is true.
 * Returns null if no profile image is found.
 */
export function getProfileImageUrl(user: UserData): string | null {
  const profileImage = user?.images?.find(
    (img) => img.is_profile && !img.is_removed
  );

  return profileImage ? profileImage.url : "/placeholder-avatar.png";
}