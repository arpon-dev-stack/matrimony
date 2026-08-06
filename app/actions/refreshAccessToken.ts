"use server";

import { cookies } from "next/headers";

export async function refreshAccessToken() {
  const cookieStore = await cookies();
  const currentRefreshToken = cookieStore.get("refreshToken")?.value;

  if (!currentRefreshToken) {
    return { success: false, accessToken: null };
  }

  // Call your auth server/database to exchange tokens
  const res = await fetch("https://your-api.com/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: currentRefreshToken }),
  });

  if (!res.ok) {
    // Clear invalid cookie on failure
    cookieStore.delete("refreshToken");
    return { success: false, accessToken: null };
  }

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    await res.json();

  // Set rotated HTTP-only refresh token back in cookies
  cookieStore.set("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return { success: true, accessToken: newAccessToken };
}
