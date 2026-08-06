"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { hashPassword, verifyPassword } from "@/app/lib/auth";
import { db } from "@/app/lib/bd";
import { AuthFormState, Gender, JoiningFor } from "@/app/types/auth";
import { User } from "@/app/types/auth";
import { generateTokens } from "../lib/tokenGenerator";
import { UserImage } from "@/app/types/auth";


