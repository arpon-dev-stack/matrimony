import type { Metadata } from "next";
import SimpleHeader from "@/components/SimpleHeader";

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
        {children}
      </>
  );
}
