"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/ui/avatar";
import { useAuthContext } from "@/features/auth/AuthProvider";

export const Header = () => {
  const { user } = useAuthContext();

  const avatar = user ? (
    <Avatar>
      <AvatarImage src={user?.photoURL ?? ""} />
      <AvatarFallback>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-user-2"
        >
          <circle cx="12" cy="8" r="5"></circle>
          <path d="M20 21a8 8 0 1 0-16 0"></path>
        </svg>
      </AvatarFallback>
    </Avatar>
  ) : (
    <></>
  );

  return (
    <header className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 mr-2 bg-gray-200 rounded-full">
          <svg
            className="w-6 h-6 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 12a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            ></path>
            <path
              fillRule="evenodd"
              d="M10 20a10 10 0 100-20 10 10 0 000 20zM0 10a10 10 0 0120 0H0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <h1 className="text-xl font-bold">rchat</h1>
      </div>
      <div className="flex items-center">{avatar}</div>
    </header>
  );
};
