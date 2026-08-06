'use server';

import { cookies } from "next/headers";
import { UpdateProfile, UserImage } from "../types/auth";
import { revalidatePath } from "next/cache";


export async function updateProfileAction(prevState: UpdateProfile,formData: FormData): Promise<UpdateProfile> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    throw new Error("Unauthorized");
  }

  const userId = 1; // Extract dynamically from session

  // Extract text fields from FormData
  const fullName = formData.get("fullName")?.toString().trim();
  const bio = formData.get("bio")?.toString().trim() || null;
  const occupation = formData.get("occupation")?.toString().trim();
  const location = formData.get("location")?.toString().trim();
  const education = formData.get("education")?.toString().trim();
  const religion = formData.get("religion")?.toString().trim();
  const language = formData.get("language")?.toString().trim();
  const familyValue = formData.get("familyValue")?.toString();
  const fitnessRoutine = formData.get("fitnessRoutine")?.toString();
  const dietary = formData.get("dietary")?.toString();

  // Parse state array inputs
  const rawInterests = formData.get("interests")?.toString() || "[]";
  const rawGallery = formData.get("gallery")?.toString() || "[]";
  const profileImageUrl = formData.get("profileImage")?.toString() || "";

  const interestsArray: string[] = JSON.parse(rawInterests);
  const galleryArray: { id: string; src: string }[] = JSON.parse(rawGallery);

  // Construct images array
  const images: UserImage[] = [];

  if (profileImageUrl) {
    images.push({ url: profileImageUrl, isProfile: true });
  }

  galleryArray.forEach((item) => {
    if (item.src !== profileImageUrl) {
      images.push({ url: item.src, isProfile: false });
    }
  });

  // Update Postgres `users` Table
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
      familyvalue: familyValue,
      fitnessroutin: fitnessRoutine,
      vegetarian: dietary === "Vegetarian",
      interests: interestsArray,
      images: images,
      completed: true,
    })
    .eq("id", userId);

  if (error) {
    console.error("Database Update Error:", error);
    throw new Error("Failed to update profile.");
  }

  revalidatePath("/user");
}
