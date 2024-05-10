import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDA2FERWQvrUYBe6SyA0X_ypyxJhhj4T_Y",
  authDomain: "npreneur-1abce.firebaseapp.com",
  projectId: "npreneur-1abce",
  storageBucket: "npreneur-1abce.appspot.com",
  messagingSenderId: "311101105882",
  appId: "1:311101105882:web:f8ce958b319821713da7e3",
  measurementId: "G-G9NFCHRET9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth  = getAuth(app);
export const storage = getStorage();
export default app;
