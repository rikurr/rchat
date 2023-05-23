import {
  getFirestore,
  addDoc,
  collection,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const sendMessage = async (roomId: string, message: string) => {
  const db = getFirestore();
  const roomDoc = doc(db, "rooms", roomId);
  const messagesCollection = collection(roomDoc, "messages");
  const { currentUser } = getAuth();
  if (!currentUser) throw new Error("User not logged in");

  await addDoc(messagesCollection, {
    text: message,
    type: "text",
    sentBy: currentUser.uid,
    createdAt: serverTimestamp(),
  });
};
