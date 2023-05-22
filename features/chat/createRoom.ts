import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const createRoom = async (roomName: string) => {
  const db = getFirestore();
  const roomsCollection = collection(db, "rooms");
  const { currentUser } = getAuth();

  if (!currentUser) throw new Error("User not logged in");

  try {
    const docRef = await addDoc(roomsCollection, {
      name: roomName,
      createdBy: currentUser.uid,
      createdAt: serverTimestamp(),
    });
    console.log("Room created with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};
