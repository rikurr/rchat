import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getApp } from "firebase/app";
import { roomDocumentList } from "./roomDocument";

const app = getApp();
const db = getFirestore(app);

export const getRooms = async () => {
  const roomsCollection = collection(db, "rooms");
  const roomSnapshot = await getDocs(roomsCollection);
  const roomList = roomSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return roomDocumentList.parse(roomList);
};
