'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from "next/cache";
import { hashPassword, verifyPassword, createSession } from '@/app/lib/auth';
import { db } from '@/app/lib/bd';
import { AuthFormState, Gender, JoiningFor } from '@/app/types/auth';
import { UserProfile } from '@/app/types/auth';

export async function signUpAction(
  prevState: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState> {
  const fullName = formData.get('fullName')?.toString().trim();
  const email = formData.get('email')?.toString().trim().toLowerCase();
  const password = formData.get('password')?.toString();
  const confirmPassword = formData.get('confirmPassword')?.toString();
  const gender = formData.get('gender')?.toString() as Gender | undefined;
  const joiningFor = formData.get('joiningFor')?.toString() as JoiningFor | undefined;
  const termsAgreed = formData.get('termsAgreed');

  // 1. Validation Checks
  if (!fullName || !email || !password || !confirmPassword || !gender || !joiningFor) {
    return { error: 'Please fill in all required fields.' };
  }

  if (!termsAgreed) {
    return { error: 'You must agree to the Terms of Service and Privacy Policy.' };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' };
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters long.' };
  }

  try {
    // 2. Check existing user
    const { data: existingUser } = await db
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) {
      return { error: 'An account with this email already exists.' };
    }

    // 3. Hash password
    const hashedPassword = await hashPassword(password);

    // 4. Create user record and select all returned fields
    const { data: user, error: insertError } = await db
      .from('users')
      .insert({
        name: fullName,
        email,
        password: hashedPassword,
        gender,
        joiningfor: joiningFor,
        agreewith: Boolean(termsAgreed),
      })
      .select('id, name, email, gender, age, location, completed, religion, occupation, education, is_verified, created_at')
      .single();

    if (insertError || !user) {
      console.error('Database Insert Error:', insertError);
      return { error: 'Failed to create user account.' };
    }

    // 5. Create & set session cookie
    const token = await createSession({
      userId: user.id,
      email: user.email,
    });

    const cookieStore = await cookies();
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { user };
  } catch (error) {
    console.error('SignUp Error:', error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

export async function signInAction(
  prevState: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState> {
  const email = formData.get('email')?.toString().trim().toLowerCase();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { error: 'Please fill in all required fields.' };
  }

  try {
    // Select password for verification alongside user profile fields
    const { data: existingUser, error } = await db
      .from('users')
      .select(`
        id,
        name,
        email,
        password,
        gender,
        age,
        location,
        completed,
        religion,
        occupation,
        education,
        is_verified,
        created_at
      `)
      .eq('email', email)
      .maybeSingle();

    if (error || !existingUser) {
      return { error: 'Invalid email or password.' };
    }

    const isValidPassword = await verifyPassword(password, existingUser.password);
    if (!isValidPassword) {
      return { error: 'Invalid email or password.' };
    }

    const token = await createSession({
      userId: existingUser.id,
      email: existingUser.email,
    });

    const cookieStore = await cookies();
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    // Safely structure user object matching UserProfile
    const user: UserProfile = {
      id: existingUser.id,
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

    return { user };
  } catch (error) {
    console.error('SignIn Error:', error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

export interface UserImage {
  url: string;
  isProfile: boolean;
}

export async function updateProfileAction(formData: FormData) {
  // 1. Fetch active session / user ID
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    throw new Error("Unauthorized");
  }

  // Retrieve user payload from session (implement your session verification)
  // const session = await verifySession(sessionToken);
  // const userId = session.userId;
  const userId = 1; // Example placeholder ID; extract dynamically from session

  // 2. Extract values from FormData
  const fullName = formData.get("fullName")?.toString().trim();
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

  // 3. Construct the `images` ARRAY matching standard schema structure with `isProfile`
  const images: UserImage[] = [];

  if (profileImageUrl) {
    images.push({ url: profileImageUrl, isProfile: true });
  }

  galleryArray.forEach((item) => {
    // Avoid duplicate entry if the user set gallery photo as profile photo
    if (item.src !== profileImageUrl) {
      images.push({ url: item.src, isProfile: false });
    }
  });

  // 4. Update Postgres `users` Table
  const { error } = await db
    .from("users")
    .update({
      name: fullName,
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

  revalidatePath("/profile");
}