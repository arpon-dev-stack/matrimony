// lib/data.ts
import { db } from "./bd"; // Your initialized Supabase client
import { unstable_cache } from "next/cache";
import { CardProfile, UserRow } from "./profiles";

function mapUserToProfile(user: UserRow): CardProfile {
  // Extract non-removed profile picture or fallback to first active image
  const activeImages = user.images?.filter((img) => !img.is_removed) || [];
  const primaryImage =
    activeImages.find((img) => img.is_profile)?.url ||
    activeImages[0]?.url ||
    "https://via.placeholder.com/600x750?text=No+Profile+Picture";

  return {
    id: user.id,
    name: user.name || "Anonymous",
    gender: user.gender,
    date_of_birth: user.date_of_birth,
    location: user.location || "N/A",
    religion: user.religion || "N/A",
    profession: user.occupation || "N/A",
    education: user.education || "N/A",
    imageUrl: primaryImage,
  };
}

export const getFeaturedProfiles = unstable_cache(
  async (): Promise<CardProfile[]> => {
    const { data, error } = await db
      .from("users")
      .select("*")
      .order("created_at", { ascending: true})
      .limit(4);

    if (error) {
      console.error("Error fetching profiles:", error.message);
      return [];
    }

    // Map each raw user row to the clean CardProfile structure
    return (data as UserRow[]).map(mapUserToProfile);
  },
  ["featured-profiles"],
  { revalidate: 3600, tags: ["featured-profiles"] }
);

export const getSuccessStories = unstable_cache(
  async () => {
    const { data, error } = await db
      .from("stories")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2);

    if (error) {
      console.error("Error fetching success stories:", error.message);
      return [];
    }

    return data;
  },
  ["success-stories"],
  { revalidate: 86400, tags: ["success-stories"] }
);