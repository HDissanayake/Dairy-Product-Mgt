// src/utils/firebaseUpload.js
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebase/firebase.config";
// adjust path if firebase.config.js is elsewhere

const storage = getStorage(app);

const uploadImageToFirebase = async (file) => {
  if (!file) throw new Error("No file provided");

  const fileRef = ref(storage, `products/${Date.now()}-${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};

export default uploadImageToFirebase;
