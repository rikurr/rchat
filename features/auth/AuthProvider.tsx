"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import { initializeFirebaseApp } from "@/lib/firebase";
import { useCurrentUser } from "./hooks/useCurrentUser";
import { UserDocument } from "@/schema/userSchama";

export type GlobalAuthState = {
  user: UserDocument | null | undefined;
};
const initialState: GlobalAuthState = {
  user: undefined,
};
const AuthContext = createContext<GlobalAuthState>(initialState);

type Props = { children: ReactNode };

initializeFirebaseApp();
export const AuthProvider = ({ children }: Props) => {
  const user = useCurrentUser();

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
