"use client";

import React, { useState, useEffect, useActionState, useRef } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/_store/AuthContext"; // Import your AuthContext hook
import { signInAction } from "@/app/actions/signInAction";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const hasHandleAuth = useRef<boolean>(false)
  const router = useRouter();
  const { signIn} = useAuth(); // Destructure signIn method from context
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(signInAction, null);

  useEffect(() => {
    if (state?.user && !hasHandleAuth.current) {
      hasHandleAuth.current = true
      signIn(state); // Stores full profile (id, email, joiningfor, location, etc.)
      router.push('/user'); // Redirects client-side after state update
    }
  }, [state, signIn, router]);

  // Simulated successful API response data
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    React.startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-[#fbf9f8] font-sans text-[#1b1c1c]">
      {/* Left Side: Visual Narrative */}
      <section className="relative w-full md:w-1/2 lg:w-7/12 h-[40vh] md:h-screen overflow-hidden group">
        <div className="absolute inset-0 z-0 bg-[#000d22] overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transform transition-transform duration-1000 group-hover:scale-105"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDlNb-459OdupS1ZcUVMFygIzlYzKfIgbBX_xQTwrSU_ESDpZYjEubz5prrZqW01whp_n2s_aEH3eL4kcxcgQQof3kh-Rqnp4HROV94TgjayzGXTOq1pnfmA_Jm_zdJvIkeFzk0twTbSvUnzieW_fW8hnL6Mb-Dgcea-mRABQdAeoE4UBP-Xjd-eYnq94HWZ1v7_Yfy4ThHdL-iCaKox9gWT9IvFAx2xd66joaIj02-QCYhTEgazpdh")`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000d22]/60 via-transparent to-[#000d22]/20" />
        </div>

        <div className="absolute top-6 left-6 md:top-16 md:left-16 z-10">
          <h1 className="font-serif text-2xl md:text-[48px] text-white tracking-tight font-bold">
            EternalUnion
          </h1>
          <p className="text-white/80 mt-2 tracking-widest uppercase text-[10px] md:text-[12px] font-semibold">
            Legacy of Love
          </p>
        </div>

        <div className="absolute bottom-16 left-16 z-10 hidden md:block">
          <blockquote className="max-w-md">
            <p className="font-serif text-2xl text-white italic leading-relaxed font-semibold">
              "Finding the one is not just a moment, but the beginning of an
              eternal legacy."
            </p>
          </blockquote>
        </div>
      </section>

      {/* Right Side: Login Form */}
      <section className="w-full md:w-1/2 lg:w-5/12 h-full flex items-center justify-center bg-white p-6 md:p-16 min-h-screen overflow-y-auto">
        <div className="w-full max-w-md">
          <header className="mb-8">
            <h2 className="font-serif text-[32px] font-semibold text-[#000d22] mb-2 leading-tight">
              Welcome Back
            </h2>
            <p className="text-base text-[#43474e]">
              Please enter your credentials to access your union.
            </p>
          </header>

          {state?.error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {state?.error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                className="block text-[12px] font-semibold uppercase tracking-[0.1em] text-[#43474e]"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#74777f] w-5 h-5 pointer-events-none" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-[#fbf9f8] border border-[#c4c6cf]/50 rounded-lg py-4 pl-12 pr-4 font-sans text-base transition-all duration-200 outline-none focus:border-[#002349] focus:ring-1 focus:ring-[#002349]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  className="block text-[12px] font-semibold uppercase tracking-[0.1em] text-[#43474e]"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-[#775a19] font-medium hover:underline transition-all"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#74777f] w-5 h-5 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-[#fbf9f8] border border-[#c4c6cf]/50 rounded-lg py-4 pl-12 pr-12 font-sans text-base transition-all duration-200 outline-none focus:border-[#002349] focus:ring-1 focus:ring-[#002349]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#74777f] hover:text-[#000d22] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Options */}
            {/* <div className="flex items-center space-x-2 py-1">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="w-4 h-4 rounded border-[#c4c6cf] text-[#000d22] focus:ring-[#000d22]/20"
              />
              <label
                htmlFor="rememberMe"
                className="text-sm text-[#43474e] select-none cursor-pointer"
              >
                Remember this device for 30 days
              </label>
            </div> */}

            {/* Action Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-5 rounded-lg text-white font-semibold text-lg shadow-lg flex items-center justify-center space-x-2 bg-gradient-to-r from-[#C5A059] to-[#B08C45] hover:shadow-[0_8px_24px_-6px_rgba(176,140,69,0.4)] hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-85 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#c4c6cf]/30" />
            </div>
          </div>

          <footer className="text-center">
            <p className="text-base text-[#43474e]">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-[#000d22] font-semibold hover:text-[#775a19] transition-colors duration-300 ml-1"
              >
                Sign Up
              </Link>
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}
