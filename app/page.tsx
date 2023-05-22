"use client";

import { AuthGuard } from "@/features/auth/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <></>
    </AuthGuard>
  );
}
