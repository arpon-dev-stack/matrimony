export type Gender = "male" | "female" | "other"; // Adjust based on your UI options
export type JoiningFor = string; // Adjust to specific union type if you have one
export interface UserImage {
  url: string;
  isProfile: boolean;
}

export interface User {
  interests?: string[];
  vegetarian?: boolean;
  fitnessroutin?: string;
  bio?: string;
  images?: UserImage[];
  familyvalue?: string;
  id: number;
  name: string;
  email: string;
  gender: Gender;
  age?: number;
  location?: string;
  completed?: boolean;
  religion?: string;
  occupation?: string;
  education?: string;
  is_verified: boolean;
  created_at: string;
}

export interface AuthFormState {
  error: string | undefined;
  user: User | undefined;
  success: boolean | undefined;
  token: string | undefined;
}
