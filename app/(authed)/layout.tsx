"use clientt";

import { AuthGuard } from "@/features/auth/AuthGuard";
import { UserAvatar } from "./components/user-avatar";
import { RoomList } from "./components/room-list";

export default function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-slate-50">
        <div className="flex flex-col w-64 bg-white border-r">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center">
              <span className="text-2xl font-semibold text-gray-800">
                rchat
              </span>
            </div>
            <div className="flex items-center">
              <UserAvatar />
            </div>
          </div>
          <nav className="flex-1 px-2 space-y-1 bg-white">
            <RoomList />
          </nav>
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">{children}</div>
      </div>
    </AuthGuard>
  );
}
