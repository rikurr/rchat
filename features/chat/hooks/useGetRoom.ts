import { getDoc, getFirestore, doc } from "firebase/firestore";
import useSWRImmutable from 'swr/immutable';
import { getApp } from "firebase/app";
import { roomDocument } from "../../../schema/roomSchema";

export const useGetRoom = (roomId: string) => {
  const app = getApp();
  const db = getFirestore(app);
  const key = ["rooms", roomId];

  const fetcher = async () => {
    const roomRef = doc(db, 'rooms', roomId);
    const roomSnapshot = await getDoc(roomRef);

  if (roomSnapshot.exists()) {
    return roomDocument.parse({ id: roomSnapshot.id, ...roomSnapshot.data() });
  } else {
    console.log('No such room!');
    return null;
  }
  };
  return useSWRImmutable(key, fetcher);
};
