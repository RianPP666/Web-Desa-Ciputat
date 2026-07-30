import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3Zt8Uy3zYASKWnKOWcRZeBuGdjTxTXIk",
  authDomain: "desa-ciputat-3ae9e.firebaseapp.com",
  projectId: "desa-ciputat-3ae9e",
  storageBucket: "desa-ciputat-3ae9e.firebasestorage.app",
  messagingSenderId: "971264161261",
  appId: "1:971264161261:web:8ddaaa6c529eb740d4e3e4",
  measurementId: "G-3TKTQ4DT7Z"
};

// Initialize Firebase only if it hasn't been initialized already (important for Next.js SSR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
