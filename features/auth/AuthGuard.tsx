"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuthContext } from "./AuthProvider";

type Props = {
  children: ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
  const { user } = useAuthContext();
  const { push } = useRouter();


  useEffect(() => {
    if (user === null) {
      push("/login");
      return;
    }
    if(user) {
      push("rooms")
      return
    } 
  },[user, push])

  if (typeof user === "undefined") {
    return <div>読み込み中...</div>;
  }


  return <>{children}</>;
};
