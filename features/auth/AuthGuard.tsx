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
  }, [user, push]);

  if (typeof user === "undefined") {
    return <div></div>;
  }

  return <>{children}</>;
};
