import { db } from "./bd";

export interface UserRow {
  id: number;
  name: string;
  joining_for: string;
  email: string;
  gender: string;
  date_of_birth: string | null;
  agree_with: boolean | null;
  location: string | null;
  completed: boolean | null;
  religion: string | null;
  occupation: string | null;
  education: string | null;
  is_verified: boolean | null;
  created_at: string | null;
  dietary: string | null;
  interests: string[] | null;
  fitness_routin: string | null;
  language: string | null;
  family_value: string | null;
  bio: string | null;
  images: ImageObj[] | null;
}

export interface Search {
  looking_for: string | undefined;
  min_age: string | undefined;
  max_age: string | undefined;
  location: string | undefined;
  religion: string | undefined;
  education: string | undefined;
  interests: string | undefined;
  name: string | undefined;
  page: string | undefined;
}

export interface CardProfile {
  id: number;
  name: string;
  gender: string;
  date_of_birth: string | null;
  location: string;
  religion: string;
  profession: string;
  education: string;
  imageUrl: string;
}

interface ImageObj {
  url: string;
  is_profile: boolean;
  is_removed: boolean;
}
export type GetUsersNot = { users: []; count: null };
export type GetUsers =
  | { users: CardProfile[]; count: number | null }
  | GetUsersNot;

// 1. Helper to safely parse PostgreSQL composite strings or JS arrays for images
function getProfileImageUrl(rawImages: any): string {
  const fallback =
    "https://via.placeholder.com/600x750?text=No+Profile+Picture";
  if (!rawImages) return fallback;

  let parsedList: ImageObj[] = [];

  // Case A: Driver already parsed it as JSON objects
  if (Array.isArray(rawImages)) {
    parsedList = rawImages;
  }
  // Case B: Raw PostgreSQL composite string like '{"(https://...jpg,t,f)", "(https://...jpg,f,f)"}'
  else if (typeof rawImages === "string") {
    const tupleMatches = rawImages.match(/\(([^)]+)\)/g);
    if (tupleMatches) {
      parsedList = tupleMatches.map((tuple) => {
        const clean = tuple.replace(/[\(\)]/g, "");
        const parts = clean.split(",");
        const url = parts[0]?.replace(/^"/, "").replace(/"$/, "") || "";
        const is_profile = parts[1] === "t" || parts[1] === "true";
        const is_removed = parts[2] === "t" || parts[2] === "true";

        return { url, is_profile, is_removed };
      });
    }
  }

  // Find image with is_profile = true AND is_removed = false
  const activeProfilePic = parsedList.find(
    (img) => img.is_profile && !img.is_removed,
  );
  if (activeProfilePic?.url) return activeProfilePic.url;

  // Fallback to first non-removed image if no primary is set
  const firstActivePic = parsedList.find((img) => !img.is_removed);
  return firstActivePic?.url || fallback;
}

// 2. Map DB row to CardProfile
function mapUserToProfile(user: any): CardProfile {
  return {
    id: user.id,
    name: user.name || "Anonymous",
    gender: user.gender,
    date_of_birth: user.date_of_birth,
    location: user.location || "N/A",
    religion: user.religion || "N/A",
    profession: user.occupation || "N/A",
    education: user.education || "N/A",
    imageUrl: getProfileImageUrl(user.images),
  };
}

const cleanParamValue = (val: string) => val.trim().replace(/[_]/g, " ");

export async function getFilteredProfiles(params: Search): Promise<GetUsers> {
  const page = Math.max(1, Number(params.page) || 1);
  const limit = 20;

  // Calculate PostgreSQL offset boundaries
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Pass { count: "exact" } to request the total count matching filters
  let query = db.from("users").select("*", { count: "exact" });

  // 1. Gender mapping
  if (params.looking_for) {
    let genderVal = cleanParamValue(params.looking_for).toLowerCase();
    if (genderVal === "man" || genderVal === "men") genderVal = "male";
    if (genderVal === "woman" || genderVal === "women") genderVal = "female";

    query = query.ilike("gender", genderVal);
  }

  // 2. Age Range calculation using date_of_birth column
  const today = new Date();

  if (params.min_age && !isNaN(Number(params.min_age))) {
    const minAge = Number(params.min_age);
    const maxDob = new Date(
      today.getFullYear() - minAge,
      today.getMonth(),
      today.getDate(),
    );
    query = query.lte("date_of_birth", maxDob.toISOString().split("T")[0]);
  }

  if (params.max_age && !isNaN(Number(params.max_age))) {
    const maxAge = Number(params.max_age);
    const minDob = new Date(
      today.getFullYear() - (maxAge + 1),
      today.getMonth(),
      today.getDate() + 1,
    );
    query = query.gte("date_of_birth", minDob.toISOString().split("T")[0]);
  }

  // 3. Location check
  if (params.location) {
    const cleanLocation = cleanParamValue(params.location);
    query = query.ilike("location", `%${cleanLocation}%`);
  }

  // 4. Religion check
  if (params.religion) {
    const selectedReligions = params.religion
      .split(",")
      .map((r) => cleanParamValue(r))
      .filter(Boolean);

    if (selectedReligions.length === 1) {
      query = query.ilike("religion", `%${selectedReligions[0]}%`);
    } else if (selectedReligions.length > 1) {
      query = query.in("religion", selectedReligions);
    }
  }

  // 5. Education check
  if (params.education) {
    const cleanEducation = cleanParamValue(params.education);
    query = query.ilike("education", `%${cleanEducation}%`);
  }

  // 6. Interests check (PostgreSQL array _text check using contains)
  if (params.interests) {
    const cleanInterests = params.interests
      .split(",")
      .map((i) => cleanParamValue(i))
      .filter(Boolean);

    if (cleanInterests.length > 0) {
      query = query.contains("interests", cleanInterests);
    }
  }

  // 7. Name check
  if (params.name) {
    const cleanName = cleanParamValue(params.name);
    query = query.ilike("name", `%${cleanName}%`);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error("Error fetching filtered profiles:", error.message);
    return { users: [], count: null };
  }

  const users = (data || []).map(mapUserToProfile);

  return { users, count };
}

export async function getProfile(id: number): Promise<UserRow | null> {
  ``;
  const { data: user, error } = await db
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching profile with id ${id}:`, error.message);
    throw new Error(error.message);
  }

  return user;
}

export async function getProfiles(): Promise<{ users: UserRow[] }> {
  const { data: users, error } = await db.from("users").select("*");

  if (error) {
    console.error("Error fetching all profiles:", error.message);
    return { users: [] };
  }

  return { users: users as UserRow[] };
}
