"use clientt"

import { AuthGuard } from "@/features/auth/AuthGuard";


export default function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
}
