import { collection, getDocs, getFirestore } from "firebase/firestore";
import useSWR from "swr";
import { getApp } from "firebase/app";
import { roomDocumentList } from "../../../schema/roomSchema";

export const useGetRooms = () => {
  const app = getApp();
  const db = getFirestore(app);
  const key = "rooms";

  const fetcher = async () => {
    const roomRef = collection(db, key);
    const roomSnapshot = await getDocs(roomRef);

    const rooms = roomSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return roomDocumentList.parse(rooms);
  };
  return useSWR(key, fetcher);
};
