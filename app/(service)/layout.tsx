import type { Metadata } from "next";
import ProtectedRoute from "@/components/ProtectedRoute";
import SimpleHeader from "@/components/SimpleHeader";
import LoadingSpinner from "@/components/LoadingSpinner";

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
      <>
        <SimpleHeader/>
        <ProtectedRoute fallback={<LoadingSpinner message="Verifying session..."/>}>
        {children}
        </ProtectedRoute>
      </>
  );
}
