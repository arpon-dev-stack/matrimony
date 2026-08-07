"use server";

import { User } from "../types/auth";
import { generateTokens } from "../lib/tokenGenerator";
import { verifyPassword } from "../lib/auth";
import { cookies } from "next/headers";
import { db } from "../lib/bd";
import { AuthUser } from "../types/auth";
export async function signInAction(
  prevState: AuthUser | null,
  formData: FormData,
): Promise<AuthUser> {
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Please fill in all required fields." };
  }

  try {
    // Select password for verification alongside user profile fields
    const { data: existingUser, error: fetchError } = await db
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (fetchError || !existingUser) {
      return { error: "Invalid email or password." };
    }

    const isValidPassword = await verifyPassword(
      password,
      existingUser.password,
    );
    if (!isValidPassword) {
      return { error: "Invalid email or password." };
    }

    const { accessToken, refreshToken } = generateTokens(existingUser.id);

    const { error: updateError } = await db
      .from("users")
      .update({ refresh_token: refreshToken })
      .eq("id", existingUser.id);

    if (updateError) {
      console.error("Failed to update refresh token:", updateError);
      // handle error
    }

    const cookieStore = await cookies();
    cookieStore.set("refreshtoken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // Safely structure user object matching User
    const user: User = {
      interests: existingUser.interests,
      vegetarian: existingUser.vegetarian,
      fitness_routin: existingUser.fitnessroutin,
      bio: existingUser.bio,
      images: existingUser.images,
      family_value: existingUser.familyValue,
      id: existingUser.id,
      language: existingUser.language,
      name: existingUser.name,
      email: existingUser.email,
      gender: existingUser.gender,
      age: existingUser.age,
      location: existingUser.location,
      completed: existingUser.completed,
      religion: existingUser.religion,
      occupation: existingUser.occupation,
      education: existingUser.education,
      is_verified: existingUser.is_verified,
      created_at: existingUser.created_at,
    };

    return { success: true, token: accessToken, user };
  } catch (error) {
    console.error("SignIn Error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
