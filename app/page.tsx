"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "@/features/auth/AuthProvider";

export default function Home() {
  const { user } = useAuthContext();
  const { push } = useRouter();

  // ログインしていない場合はログイン画面へ
  // ログインしている場合はダッシュボードへ
  useEffect(() => {
    if (user === null) {
      push("/login");
      return;
    }
    if (user) {
      push("dashboard");
      return;
    }
  }, [user, push]);

  if (typeof user === "undefined") {
    return <div>読み込み中...</div>;
  }

  return <></>;
}
