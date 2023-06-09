import { initializeFirebaseApp } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";
import {
  getDoc,
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { userDocument } from "@/schema/userSchama";

// ユーザードキュメントの作成
const createUserProfileDocument = async (user: User) => {
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

// プロフィール画像のアップロード
const uploadUserProfileImageToStorage = async (userId: string, url: string) => {
  const storageRef = ref(getStorage(), `images/${userId}/profile`);
  const blob = await fetch(url).then((r) => r.blob());
  const snapshot = await uploadBytes(storageRef, blob);

  const storageUrl = getDownloadURL(
    ref(snapshot.ref.storage, snapshot.ref.fullPath),
  );

  return storageUrl;
};

// 新規ユーザーの作成
type CreateUserValues = {
  displayName: string;
  email: string;
  password: string;
  photoURL: string | null;
};

export const signupUser = async (userValues: CreateUserValues) => {
  initializeFirebaseApp();
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    userValues.email,
    userValues.password,
  );

  const storageUrl = userValues.photoURL
    ? await uploadUserProfileImageToStorage(
        userCredential.user.uid,
        userValues.photoURL,
      )
    : null;
  await updateProfile(userCredential.user, {
    displayName: userValues.displayName,
    photoURL: storageUrl,
  });
  createUserProfileDocument(userCredential.user);
  await sendEmailVerification(userCredential.user);
};

type EditUserValues = {
  displayName: string;

  photoURL: string | null;
};
export const editUserProfile = async (userValues: EditUserValues) => {
  initializeFirebaseApp();
  const auth = getAuth();
  if (!auth.currentUser) throw new Error("User not logged in");

  let photoURL = userValues.photoURL;
  if(userValues.photoURL && userValues.photoURL !== auth.currentUser.photoURL ) {
    photoURL = await uploadUserProfileImageToStorage(
        auth.currentUser.uid,
        userValues.photoURL,
      )
  }
  await updateProfile(auth.currentUser, {
    displayName: userValues.displayName,
    photoURL: photoURL,
  });

  const db = getFirestore();
  const userRef = doc(db, "users", auth.currentUser.uid);
  // ユーザーの更新
  await setDoc(
    userRef,
    {
      displayName: userValues.displayName,
      photoURL: photoURL,
    },
    { merge: true },
  );
};
