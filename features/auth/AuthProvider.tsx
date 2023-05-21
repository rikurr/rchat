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

export type GlobalAuthState = {
  user: User | null | undefined;
};
const initialState: GlobalAuthState = {
  user: undefined,
};
const AuthContext = createContext<GlobalAuthState>(initialState);

type Props = { children: ReactNode };

initializeFirebaseApp();
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<GlobalAuthState>(initialState);
  useEffect(() => {
    try {
      const auth = getAuth();
      return onAuthStateChanged(auth, async (user) => {
        console.log("user", user);
        setUser({ user });
      });
    } catch (error) {
      setUser(initialState);
      throw error;
    }
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
