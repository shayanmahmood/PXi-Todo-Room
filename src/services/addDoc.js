import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase"; // make sure your firebase.js exports 'db'

import { serverTimestamp } from "firebase/firestore";

export async function addDocs(userData) {
  let data;
  try {
    data = await addDoc(collection(db, "message"), {
      ...userData,
      createdAt: serverTimestamp(), // important for sorting
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }

  return data;
}

export async function readDocs() {
  try {
    const q = query(
      collection(db, "message"),
      orderBy("createdAt", "desc") // descending order (latest first)
    );
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched users:", users);
    return users;
  } catch (error) {
    console.error("Error reading documents: ", error);
    return [];
  }
}
