"use client";

import Link from "next/link";
import { useAuthContext } from "@/features/auth/AuthProvider";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <div className="flex flex-col items-center min-h-screen">
      {user ? (
        <div className="mt-8">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">ルーム</h1>
          <div className="flex gap-2">
            <Link
              href="/rooms"
              className="px-6 py-2 text-xs font-medium text-center text-white transition bg-primary rounded shadow ripple waves-light hover:shadow-lg focus:outline-none"
            >
              ルーム一覧
            </Link>
            <Link
              href="/rooms/create"
              className="px-6 py-2 text-xs font-medium text-center text-white transition bg-primary rounded shadow ripple waves-light hover:shadow-lg focus:outline-none"
            >
              ルーム作成
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="mb-4 text-2xl font-bold text-gray-800">始める</h1>
          <div className="flex gap-2">
            <Link
              href="/signup"
              className="px-6 py-2 text-xs font-medium text-center text-white transition bg-primary rounded shadow ripple waves-light hover:shadow-lg focus:outline-none"
            >
              新規作成
            </Link>
            <Link
              href="/login"
              className="px-6 py-2 text-xs font-medium text-center text-white transition bg-primary rounded shadow ripple waves-light hover:shadow-lg focus:outline-none"
            >
              ログイン
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
