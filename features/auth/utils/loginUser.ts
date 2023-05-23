import { initializeFirebaseApp } from "@/lib/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

type LoginUserValues = {
  email: string;
  password: string;
};

export const loginUser = async (loginUserValues: LoginUserValues) => {
  initializeFirebaseApp();
  const auth = getAuth();
  await signInWithEmailAndPassword(
    auth,
    loginUserValues.email,
    loginUserValues.password,
  );
};
