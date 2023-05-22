import {
  collection,
  doc,
  getDoc,
  query,
  orderBy,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import useSWR from "swr";
import { getApp } from "firebase/app";
import { useEffect, useState } from "react";
import { MessageDocument, messageDocumentList } from "../roomDocument";

const app = getApp();
const db = getFirestore(app);

const listenForMessages = async (
  roomId: string,
  setter: (messages: MessageDocument[]) => void,
) => {
  const messagesCollection = collection(db, `rooms/${roomId}/messages`);
  const q = query(messagesCollection, orderBy("createdAt"));

  const unsubscribe = onSnapshot(q, async (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const resultMessages = messageDocumentList.parse(messages);

    const userInMessages = await Promise.all(
      resultMessages.map(async (message) => {
        const userSnapshot = await getDoc(doc(db, "users", message.sentBy));
        return {
          ...message,
          user: userSnapshot.data(),
        };
      }),
    );

    console.log(userInMessages);
    setter(userInMessages);
  });

  return unsubscribe;
};

export const useMessages = (roomId: string) => {
  const [messages, setMessages] = useState<MessageDocument[]>([]);

  return messages;
};
