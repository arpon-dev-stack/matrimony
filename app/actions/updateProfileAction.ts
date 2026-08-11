"use server";

import { revalidatePath } from "next/cache";
import { UpdateProfile } from "../types/auth";
import { db } from "@/app/lib/bd";

export async function updateProfileAction(
  prevState: UpdateProfile,
  formData: FormData,
): Promise<UpdateProfile> {
  // 1. Extract Authorization Token & User ID from FormData
  const accessToken = formData.get("access_token")?.toString();
  const userPayload = formData.get("id")?.toString();

  if (!accessToken) {
    throw new Error("Unauthorized: Missing access token");
  }

  if (!userPayload) {
    throw new Error("Bad Request: Missing user identifier in form data");
  }

  // Parse user ID
  let userId: number | string;
  try {
    const parsedUser = JSON.parse(userPayload);
    userId =
      typeof parsedUser === "object" && parsedUser !== null
        ? parsedUser.id
        : parsedUser;
  } catch {
    userId = isNaN(Number(userPayload)) ? userPayload : Number(userPayload);
  }

  // 2. Extract Text Fields
  const fullName = formData.get("full_name")?.toString().trim();
  const bio = formData.get("bio")?.toString().trim() || null;
  const occupation = formData.get("occupation")?.toString().trim();
  const location = formData.get("location")?.toString().trim();
  const education = formData.get("education")?.toString().trim();
  const religion = formData.get("religion")?.toString().trim();
  const language = formData.get("language")?.toString().trim();
  const familyValue = formData.get("family_value")?.toString();
  const fitnessRoutine = formData.get("fitness_routine")?.toString();
  const dateOfBirth = formData.get("date_of_birth")?.toString();
  const dietary = formData.get("dietary")?.toString();

  console.log(`value ${dateOfBirth} and typeof ${typeof dateOfBirth}`);

  // 3. Parse JSON Arrays
  const rawInterests = formData.get("interests")?.toString() || "[]";
  const rawGallery = formData.get("gallery")?.toString() || "[]";
  const profileImageUrl = formData.get("profile_image")?.toString() || "";

  const interestsArray: string[] = JSON.parse(rawInterests);
  const galleryArray: { id: string; src: string; isRemoved?: boolean }[] =
    JSON.parse(rawGallery);

  // 4. Construct Structured JS Objects for the `_user_image` Composite Type Array
  // Note: Object field names must match Postgres composite type attributes exact names
  type UserImageComposite = {
    url: string;
    is_profile: boolean;
    is_removed: boolean;
  };

  const formattedImages: UserImageComposite[] = [];

  if (profileImageUrl) {
    formattedImages.push({
      url: profileImageUrl,
      is_profile: true,
      is_removed: false,
    });
  }

  galleryArray.forEach((item) => {
    if (item.src !== profileImageUrl) {
      formattedImages.push({
        url: item.src,
        is_profile: false,
        is_removed: item.isRemoved ?? false,
      });
    }
  });

  // 5. Query and Update Database Record
  const { error } = await db
    .from("users")
    .update({
      name: fullName,
      bio,
      occupation,
      location,
      education,
      religion,
      language,
      date_of_birth: dateOfBirth,
      family_value: familyValue,
      fitness_routin: fitnessRoutine,
      vegetarian: dietary === "Vegetarian",
      interests: interestsArray,
      images: formattedImages, // Passed as structured JS array objects
      completed: true,
    })
    .eq("id", userId);

  if (error) {
    console.error("Database Update Error:", error);
    throw new Error(
      `Failed to update profile: ${error.message || error.details}`,
    );
  }

  revalidatePath("/user");

  return { success: true };
}
