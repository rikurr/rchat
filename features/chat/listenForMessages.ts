import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { getApp } from "firebase/app";

const app = getApp();
const db = getFirestore(app);

const listenForMessages = (roomId: string) => {
  const messagesCollection = collection(db, `rooms/${roomId}/messages`);
  const q = query(messagesCollection, orderBy("createdAt"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(messages);
  });

  return unsubscribe;
};
