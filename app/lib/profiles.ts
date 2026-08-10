import { db } from "./bd";

export interface ImageItem {
  url: string;
  is_profile: boolean;
  is_removed: boolean;
}

export interface UserRow {
  date_of_birth: string | null;
  id: number;
  name: string;
  joining_for: string;
  email: string;
  gender: string;
  age: number | null;
  agree_with: boolean;
  location: string | null;
  completed: boolean;
  religion: string | null;
  occupation: string | null;
  education: string | null;
  is_verified: boolean;
  created_at: string;
  vegetarian: string | null;
  interests: string[] | null;
  fitness_routin: string | null;
  language: string | null;
  family_value: string | null;
  bio: string | null;
  images: ImageItem[] | null;
}

export interface CardProfile {
  id: number;
  name: string;
  gender: string;
  date_of_birth: string | null;
  location: string | null;
  religion: string | null;
  profession: string | null;
  education: string | null;
  imageUrl: string | null;
}

/**
 * Maps a raw database row from the `users` table to the UI `Profile` format.
 */
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

export async function getFilteredProfiles(params: {
  looking_for?: string;
  age_range?: string;
  location?: string;
  religion?: string;
  education?: string;
  interests?: string;
  name?: string;
}): Promise<CardProfile[]> {

  let query = db.from("users").select("*");

  // 1. Gender check
  if (params.looking_for) {
    query = query.ilike("gender", params.looking_for.trim());
  }

  // 2. Age Range check via date_of_birth
  if (params.age_range) {
    const [minAge, maxAge] = params.age_range
      .split("-")
      .map((val) => parseInt(val.trim(), 10));

    const today = new Date();

    if (!isNaN(minAge)) {
      // Latest birth date to be at least minAge years old
      const maxDob = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
      query = query.lte("date_of_birth", maxDob.toISOString().split("T")[0]);
    }

    if (!isNaN(maxAge)) {
      // Earliest birth date to still be maxAge years old (strictly less than maxAge + 1)
      const minDob = new Date(today.getFullYear() - (maxAge + 1), today.getMonth(), today.getDate() + 1);
      query = query.gte("date_of_birth", minDob.toISOString().split("T")[0]);
    }
  }

  // 3. Location check
  if (params.location) {
    query = query.ilike("location", `%${params.location.trim()}%`);
  }

  // 4. Multi-value Religion check
  if (params.religion) {
    const selectedReligions = params.religion
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);

    if (selectedReligions.length > 0) {
      query = query.in("religion", selectedReligions);
    }
  }

  // 5. Education check
  if (params.education) {
    query = query.ilike("education", `%${params.education.trim()}%`);
  }

  // 6. Interests / Tags check
  if (params.interests) {
    const requestedInterests = params.interests
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    if (requestedInterests.length > 0) {
      query = query.overlaps("interests", requestedInterests);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching filtered profiles:", error.message);
    return [];
  }

  return (data as UserRow[]).map(mapUserToProfile);
}

export async function getProfile(id: number): Promise<UserRow | null> {

  const { data: user, error } = await db
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching profile with id ${id}:`, error.message);
    throw new Error(error.message)
  }

  return (user);
}

export async function getProfiles(): Promise<{ users: UserRow[] }> {
  const { data: users, error } = await db.from("users").select("*");

  if (error) {
    console.error("Error fetching all profiles:", error.message);
    return { users: [] };
  }

  return { users: users as UserRow[] };
}