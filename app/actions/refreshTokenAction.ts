"use server";

import { cookies } from "next/headers";
import { db } from "../lib/bd";
import { generateTokens } from "../lib/tokenGenerator";

export async function refreshTokenAction() {
  const cookieStore = await cookies();
  const oldRefreshToken = cookieStore.get("refreshtoken")?.value;

  if (!oldRefreshToken) {
    return { error: "No refresh token available" };
  }

  try {
    // 1. Fetch user by old refresh token
    const { data: existingUser, error: fetchError } = await db
      .from("users")
      .select("id")
      .eq("refresh_token", oldRefreshToken)
      .maybeSingle();

    if (fetchError || !existingUser) {
      // Clear cookie if invalid
      cookieStore.delete("refreshtoken");
      return { error: "Invalid session" };
    }

    // 2. Generate new token pair (Rotation)
    const { accessToken: token, refreshToken: newRefreshToken } = generateTokens(
      existingUser.id,
    );

    // 3. Update database with new refresh token
    await db
      .from("users")
      .update({ refresh_token: newRefreshToken })
      .eq("id", existingUser.id);

    // 4. Update HTTP-only cookie
    cookieStore.set("refreshtoken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    const id: number = existingUser.id;

    return { success: true, token, id };
  } catch (error) {
    console.error("Refresh Token Error:", error);
    return { error: "Session restoration failed" };
  }
}
