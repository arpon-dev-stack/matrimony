import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ProtectedRoute from "@/components/ProtectedRoute";
import SimpleHeader from "@/components/SimpleHeader";
import LoadingSpinner from "@/components/LoadingSpinner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Metrimony",
  description: "A modern matrimonial web app for meaningful connections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SimpleHeader/>
        <ProtectedRoute fallback={<LoadingSpinner message="Verifying session..."/>}>
        {children}
        </ProtectedRoute>
      </body>
    </html>
  );
}
