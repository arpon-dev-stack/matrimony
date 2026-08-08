export type Gender = "male" | "female" | "other"; // Adjust based on your UI options
export type JoiningFor = string; // Adjust to specific union type if you have one
export interface UserImage {
  url: string;
  is_profile: boolean;
  is_removed: boolean;
}

export interface User {
  date_of_birth?: number;
  interests?: string[];
  vegetarian?: string;
  fitness_routin?: string;
  bio?: string;
  images?: UserImage[];
  family_value?: string;
  id?: number;
  language?: string;
  name?: string;
  email?: string;
  gender?: Gender;
  age?: number;
  location?: string;
  completed?: boolean;
  religion?: string;
  occupation?: string;
  education?: string;
  is_verified?: boolean;
  created_at?: string;
}

export interface AuthUser {
  error?: string;
  user?: User;
  success?: boolean;
  token?: string;
}



export interface AuthFormState {
  error?: string;
  user?: User;
  success?: boolean;
  token?: string;
}

export interface UpdateProfile {error?: string, success?: boolean}