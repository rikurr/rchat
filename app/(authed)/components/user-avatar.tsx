"use client";

import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/ui/avatar";
import { Button } from "@/common/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { useAuthContext } from "@/features/auth/AuthProvider";
import { logoutUser } from "@/features/auth/utils/logoutUser";

export const UserAvatar = () => {
  const { user } = useAuthContext();
  const { push } = useRouter();

  if (!user) {
    return <></>;
  }

  console.log("変更", user)

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={user.photoURL ?? ""} />
          <AvatarFallback>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              className="lucide lucide-user-2"
            >
              <circle cx="12" cy="8" r="5"></circle>
              <path d="M20 21a8 8 0 1 0-16 0"></path>
            </svg>
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <ul>
          <li className="hover:bg-slate-100">
            <Button onClick={() => push("/profile/edit")} variant="ghost" className="w-full">
              <p className="text-sm">プロフィール編集</p>
            </Button>
          </li>
          <li className="hover:bg-slate-100">
            <Button onClick={logoutUser} variant="ghost" className="w-full">
              ログアウト
            </Button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
