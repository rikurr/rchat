import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  getFirestore,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { UserDocument, userDocument } from "@/schema/userSchama";
import {
  MessageInUserDocument,
  messageInUserDocument,
} from "@/schema/roomSchema";

const app = getApp();
const db = getFirestore(app);

// メッセージの取得
export const useSnapshotMessages = (roomId: string) => {
  const [messages, setMessages] = useState<MessageInUserDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const messagesCollection = collection(db, `rooms/${roomId}/messages`);
    const q = query(messagesCollection, orderBy("createdAt"));

    // ユーザーデータをキャッシュする
    const userCache: { [key: string]: UserDocument } = {};

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const newMessages = snapshot.docs.map(async (docSnapshot) => {
        // メッセージデータを取得する
        const messageData = docSnapshot.data();

        // キャッシュに存在しない場合はユーザーデータを取得する
        const exitsUser = userCache[messageData.sentBy];
        if (!exitsUser) {
          const userRef = doc(db, "users", messageData.sentBy);
          const userSnapshot = await getDoc(userRef);
          const userData = userDocument.parse(userSnapshot.data());
          userCache[messageData.sentBy] = userData;
        }

        // ユーザーデータをマージする
        messageData.user = userCache[messageData.sentBy];
        const resultData = { id: docSnapshot.id, ...messageData };
        return messageInUserDocument.parse(resultData);
      });

      setMessages(await Promise.all(newMessages));
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [roomId]);

  return { messages, isLoading };
};
