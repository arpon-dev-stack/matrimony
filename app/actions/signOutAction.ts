"use server";

import { cookies } from "next/headers";
import { db } from "../lib/bd";

export async function signOutAction() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshtoken")?.value;

  if (refreshToken) {
    try {
      // 1. Clear refresh token in Supabase / Postgres DB
      await db
        .from("users")
        .update({ refresh_token: null })
        .eq("refresh_token", refreshToken);
    } catch (error) {
      console.error("Failed to clear refresh token from DB:", error);
    }
  }

  // 2. Clear HTTP-only cookie on the client
  cookieStore.delete("refreshtoken");

  return { success: true };
}