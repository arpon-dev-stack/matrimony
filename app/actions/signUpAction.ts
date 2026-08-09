"use server";

import { generateTokens } from "../lib/tokenGenerator";
import { db } from "../lib/bd";
import { hashPassword } from "../lib/auth";
import { cookies } from "next/headers";
import { ActionState } from "./signInAction";

export async function signUpAction(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const fullName = formData.get("fullName")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();
  const gender = formData.get("gender")?.toString();
  const joiningFor = formData.get("joiningFor")?.toString();
  const termsAgreed = formData.get("termsAgreed");

  // 1. Validation Checks
  if (
    !fullName ||
    !email ||
    !password ||
    !confirmPassword ||
    !gender ||
    !joiningFor
  ) {
    return { error: "Please fill in all required fields." };
  }

  if (!termsAgreed) {
    return {
      error: "You must agree to the Terms of Service and Privacy Policy.",
    };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long." };
  }

  try {
    // 2. Check existing user
    const { data: existingUser } = await db
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return { error: "An account with this email already exists." };
    }

    // 3. Hash password
    const hashedPassword = await hashPassword(password);

    // 4. Create user record and select all returned fields
    const { data: insertUser, error: insertError } = await db
      .from("users")
      .insert({
        name: fullName,
        email,
        password: hashedPassword,
        gender,
        joining_for: joiningFor,
        agree_with: Boolean(termsAgreed),
      })

      .select("id")
      .single();

    if (insertError || !insertUser) {
      console.error("Database Insert Error:", insertError);
      return { error: "Failed to create user account." };
    }

    // 5. Create & set session cookie
    const { accessToken: token, refreshToken } = generateTokens(insertUser.id);

    const { error: updateError } = await db
      .from("users")
      .update({ refresh_token: refreshToken })
      .eq("id", insertUser.id);

    if (updateError) {
      console.error("Failed to update refresh token:", updateError);
    }

    const cookieStore = await cookies();
    cookieStore.set("session", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    const id: number = insertUser.id
    return { success: true, token, id };
  } catch (error) {
    console.error("SignUp Error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
