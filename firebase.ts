import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// User provided config
const firebaseConfig = {
  apiKey: "AIzaSyDwCcpbADj0G86vHDUN3dGF_A2pl3hKm2s",
  authDomain: "top-50-ai-tools.firebaseapp.com",
  projectId: "top-50-ai-tools",
  storageBucket: "top-50-ai-tools.firebasestorage.app",
  messagingSenderId: "1068555557815",
  appId: "1:1068555557815:web:aa6cca3a2ddcdce4d7e632",
  measurementId: "G-40DJN4GF6V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
