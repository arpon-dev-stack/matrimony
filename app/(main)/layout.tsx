import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "../globals.css";

export const metadata: Metadata = {
  title: "Matrimony",
  description: "A modern matrimonial web app for meaningful connections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <Navbar/>
        {children}
      </>
  );
}
