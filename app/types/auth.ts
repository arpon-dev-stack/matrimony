export type Gender = 'male' | 'female' | 'other'; // Adjust based on your UI options
export type JoiningFor = string; // Adjust to specific union type if you have one

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  gender: Gender;
  age: number | null;
  location: string | null;
  completed: boolean | null;
  religion: string | null;
  occupation: string | null;
  education: string | null;
  is_verified: boolean | null;
  created_at: string | null;
  isAuthenticated?: boolean;
}

export interface AuthFormState {
  error?: string;
  user?: UserProfile;
}