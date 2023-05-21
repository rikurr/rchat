import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";
import {
  getDoc,
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { z } from "zod";

const userDocument = z
  .object({
    displayName: z.string().nullable(),
    email: z.string(),
    photoURL: z.string().nullable(),
  })
  .optional();

export type UserDocument = z.infer<typeof userDocument>;

// ユーザードキュメントの作成
export const createUserProfileDocument = async (user: User) => {
  const db = getFirestore();
  const userRef = doc(db, "users", user.uid);

  const userSnapShot = await getDoc(userRef);

  if (!userSnapShot.exists()) {
    const { displayName, email, photoURL } = user;
    try {
      await setDoc(userRef, {
        displayName,
        email,
        photoURL,
        createdAt: serverTimestamp(),
      });

    } catch (error) {
      if (error instanceof FirebaseError) {
        console.dir(error);
        throw error;
      }
    }
  }
  const result = userDocument.parse(userSnapShot.data());

  return result;
};
