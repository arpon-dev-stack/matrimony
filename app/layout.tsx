'use client';

// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./_store/AuthContext";
import Note from "@/components/ui/Note";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <Note/>
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
