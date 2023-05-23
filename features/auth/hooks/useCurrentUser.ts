import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { userDocument } from "@/schema/userSchama";
import { GlobalAuthState } from "@/features/auth/AuthProvider";

export function useCurrentUser() {
  const [user, setUser] = useState<GlobalAuthState>({
    user: undefined,
  });

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    // 監視するAuthの状態
    const unsubscribeFromAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ユーザーがログインしている場合、そのユーザーのドキュメントを監視する
        const userRef = doc(db, "users", user.uid);
        const unsubscribeFromUser = onSnapshot(userRef, (docSnapshot) => {
          setUser({
            user: userDocument.parse({
              id: docSnapshot.id,
              ...docSnapshot.data(),
            }),
          });
        });

        // Firestoreの監視をクリーンアップする
        return () => unsubscribeFromUser();
      } else {
        // ユーザーがログアウトしている場合、nullを設定する
        setUser({
          user: null,
        });
      }
    });

    // Authの監視をクリーンアップする
    return () => unsubscribeFromAuth();
  }, []);

  return user;
}
