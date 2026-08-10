"use server";

import { generateTokens } from "../lib/tokenGenerator";
import { verifyPassword } from "../lib/auth";
import { cookies } from "next/headers";
import { db } from "../lib/bd";
import { UserImage } from "../types/auth";

export type ActionState =
  | { success: true; token: string; id: number; error?: never, profile?: string }
  | { error: string; success?: never; token?: never; id?: never, profile?: never };

export async function signInAction(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Please fill in all required fields." };
  }

  try {
    // Select password for verification alongside user profile fields
    const { data: existingUser, error: fetchError } = await db
      .from("users")
      .select("id, password, images")
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
    const id: number = existingUser.id;
    const images: UserImage[] = existingUser.images;

    function getProfileImageUrl(images: UserImage[]): string | undefined {
      const profileImage = images.find(
        (img) => img.is_profile && !img.is_removed,
      );

      return profileImage ? profileImage.url : undefined;
    }

    const profile: string | undefined = getProfileImageUrl(images);

    console.log(profile);
    
    return { success: true, token: accessToken, id, profile };

  } catch (error) {
    console.error("SignIn Error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
