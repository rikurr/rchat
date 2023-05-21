import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// プロフィール画像のアップロード
export const uploadUserProfileImageToStorage = async (
  userId: string,
  url: string,
) => {
  const storageRef = ref(getStorage(), `images/${userId}/profile/${uuidv4()}`);
  const blob = await fetch(url).then((r) => r.blob());
  const snapshot = await uploadBytes(storageRef, blob);

  const storageUrl = getDownloadURL(
    ref(snapshot.ref.storage, snapshot.ref.fullPath),
  );

  return storageUrl;
};
