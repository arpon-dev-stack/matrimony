'use client';

import { geist, geist_mono } from "./ui/font";
import "./globals.css";
import { AuthProvider } from "./_store/AuthContext";
import Note from "@/components/ui/Note";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.className} ${geist_mono.className} h-full antialiased scroll-smooth`}
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
