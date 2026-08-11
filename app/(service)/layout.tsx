import ProtectedRoute from "@/components/ProtectedRoute";
import SimpleHeader from "@/components/SimpleHeader";
import LoadingSpinner from "@/components/LoadingSpinner";


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
