'use client';

import React, { useState, useActionState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/_store/AuthContext'
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Users,
  ChevronDown,
  ArrowRight,
  Loader2,
  Coins,
} from 'lucide-react';
import { signUpAction } from '@/app/actions/signUpAction';
import { AuthFormState} from '@/app/types/auth';

export default function SignupForm() {
  const router = useRouter();
  const {signIn} = useAuth();
  const [state, formAction, isPending] = useActionState<AuthFormState, FormData>(
    signUpAction,
    {}
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  useEffect(() => {
      if (state?.user) {
        signIn(state); // Stores full profile (id, email, joiningfor, location, etc.)
        router.push('/user'); // Redirects client-side after state update
      }
    }, [state, signIn, router]);

  // 1. Create a custom submit handler to prevent default behavior
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation before triggering action
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // React 19 / Next.js 15: pass the Form Event directly inside startTransition
    React.startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-[#fbf9f8] font-sans text-[#1b1c1c]">
      {/* Left Visual Panel */}
      <section className="hidden md:flex md:w-1/2 lg:w-3/5 relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 z-0 scale-105 transition-transform duration-10000 hover:scale-100 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBprOksDn6kNuaUYnc7Xvqlo89va8ELqU0ivmlkNlS-dSyaSVzKDL_yqB95d0Y19rz3J8JAuxHZ8DrjuwAUgAiJW8OdCQZsqcUbxgAve6rfbrpZvgBTABfZAZJ-y03utCWQLLa6kehQjMtQOdpud4hfU4kUmMoZ_ecbbdW5L-zHDKk_djJ4S73My-EW6ZWrjaj5c8o9KkQB8WOpSEJnbzTJzu6jpJZ6J7teLnRSS_XNUa8EBpSX3Ddg")`,
          }}
        />
        <div className="absolute inset-0 bg-[#000d22] z-10 opacity-90" />

        <div className="relative z-20 p-16 flex flex-col justify-between h-full w-full">
          <div>
            <h2 className="font-serif text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-white mb-3 drop-shadow-md">
              EternalUnion
            </h2>
            <div className="h-1 w-16 bg-[#775a19] rounded-full" />
          </div>
          <div className="max-w-md mb-12">
            <p className="font-serif text-[32px] font-semibold leading-[1.2] text-white italic mb-3">
              "True love is not just looking at each other, but looking in the same direction."
            </p>
            <p className="text-lg text-white/90">— The Prestigious Circle</p>
          </div>
        </div>
      </section>

      {/* Right Form Panel */}
      <section className="flex-1 flex items-center justify-center p-6 md:p-16 bg-[#fbf9f8] z-30 overflow-y-auto">
        <div className="w-full max-w-120">
          <div className="md:hidden mb-6 flex items-center gap-2">
            <Coins className="text-[#000d22] w-8 h-8" />
            <h1 className="font-serif text-[32px] font-bold text-[#000d22]">
              EternalUnion
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="font-serif text-[32px] font-semibold leading-[1.2] text-[#000d22] mb-2">
              Begin Your Eternal Journey
            </h2>
            <p className="text-base text-[#43474e] leading-relaxed">
              Join the most prestigious circle of singles seeking deep connection and lifelong commitment.
            </p>
          </div>

          {/* Error Message */}
          {state?.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {state.error}
            </div>
          )}

          {/* 2. Replace action={formAction} with onSubmit={handleSubmit} */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="relative group">
              <label
                className="block text-[12px] font-semibold uppercase tracking-[0.1em] text-[#74777f] mb-2 transition-colors group-focus-within:text-[#000d22]"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c4c6cf] w-5 h-5 pointer-events-none" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="e.g. Julian Alexander Thorne"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-[#c4c6cf]/30 rounded-lg focus:ring-1 focus:ring-[#775a19] focus:border-[#775a19] transition-all outline-none text-base placeholder:text-[#c4c6cf]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative group">
              <label
                className="block text-[12px] font-semibold uppercase tracking-[0.1em] text-[#74777f] mb-2 transition-colors group-focus-within:text-[#000d22]"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c4c6cf] w-5 h-5 pointer-events-none" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="email@prestige.com"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-[#c4c6cf]/30 rounded-lg focus:ring-1 focus:ring-[#775a19] focus:border-[#775a19] transition-all outline-none text-base placeholder:text-[#c4c6cf]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative group">
              <label
                className="block text-[12px] font-semibold uppercase tracking-[0.1em] text-[#74777f] mb-2 transition-colors group-focus-within:text-[#000d22]"
                htmlFor="password"
              >
                Create Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c4c6cf] w-5 h-5 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-white border border-[#c4c6cf]/30 rounded-lg focus:ring-1 focus:ring-[#775a19] focus:border-[#775a19] transition-all outline-none text-base placeholder:text-[#c4c6cf]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c4c6cf] hover:text-[#000d22] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative group">
              <label
                className="block text-[12px] font-semibold uppercase tracking-[0.1em] text-[#74777f] mb-2 transition-colors group-focus-within:text-[#000d22]"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c4c6cf] w-5 h-5 pointer-events-none" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-white border border-[#c4c6cf]/30 rounded-lg focus:ring-1 focus:ring-[#775a19] focus:border-[#775a19] transition-all outline-none text-base placeholder:text-[#c4c6cf]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c4c6cf] hover:text-[#000d22] transition-colors"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Gender Selection */}
            <div className="space-y-2">
              <label className="block text-[12px] font-semibold uppercase tracking-[0.1em] text-[#74777f]">
                Gender
              </label>
              <div className="flex gap-6">
                {(['male', 'female', 'other'] as const).map((genderOption) => (
                  <label
                    key={genderOption}
                    className="flex items-center gap-2 cursor-pointer group capitalize"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={genderOption}
                      required
                      className="w-4 h-4 border-[#c4c6cf] text-[#775a19] focus:ring-[#775a19]"
                    />
                    <span className="text-base text-[#43474e] group-hover:text-[#000d22] transition-colors">
                      {genderOption}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Joining For Dropdown */}
            <div className="relative group">
              <label
                className="block text-[12px] font-semibold uppercase tracking-[0.1em] text-[#74777f] mb-2 transition-colors group-focus-within:text-[#000d22]"
                htmlFor="joiningFor"
              >
                Joining For
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c4c6cf] w-5 h-5 pointer-events-none" />
                <select
                  id="joiningFor"
                  name="joiningFor"
                  required
                  defaultValue=""
                  className="w-full pl-12 pr-10 py-4 bg-white border border-[#c4c6cf]/30 rounded-lg focus:ring-1 focus:ring-[#775a19] focus:border-[#775a19] transition-all outline-none text-base appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="self">Self</option>
                  <option value="son_daughter">Son / Daughter</option>
                  <option value="sibling">Sibling</option>
                  <option value="friend">Friend</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c4c6cf] w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3 py-2">
              <input
                id="termsAgreed"
                name="termsAgreed"
                type="checkbox"
                required
                className="mt-1 w-4 h-4 rounded border-[#c4c6cf] text-[#775a19] focus:ring-[#775a19]"
              />
              <label className="text-sm text-[#43474e]" htmlFor="termsAgreed">
                I agree to the{' '}
                <a href="#" className="text-[#775a19] font-semibold hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#775a19] font-semibold hover:underline">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 text-white font-semibold rounded-lg flex items-center justify-center gap-2 group bg-gradient-to-r from-[#C5A059] to-[#B08C45] hover:shadow-[0_8px_24px_-6px_rgba(197,160,89,0.4)] hover:-translate-y-px hover:brightness-105 transition-all duration-300 disabled:opacity-90 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Entering the Circle...</span>
                </>
              ) : (
                <>
                  <span>Create My Profile</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="pt-3 text-center">
              <p className="text-base text-[#43474e]">
                Already have an account?{' '}
                <Link
                  href="/signin"
                  className="text-[#000d22] font-bold hover:text-[#775a19] transition-colors inline-flex items-center ml-1"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}