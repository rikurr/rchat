import { useEffect, useState } from "react";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import { getApp } from "firebase/app";
import { RoomDocument, roomDocumentList } from "@/schema/roomSchema";

export const useGetRooms = () => {
  const [rooms, setRooms] = useState<RoomDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const app = getApp();
    const db = getFirestore(app);

    const roomRef = collection(db, "rooms");

    const unsubscribe = onSnapshot(
      roomRef,
      (snapshot) => {
        const newDocs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRooms(roomDocumentList.parse(newDocs));
        setLoading(false);
      },
      (error) => {
        setError(error);
      },
    );

    return () => unsubscribe();
  }, []);

  return { rooms, loading, error };
};
