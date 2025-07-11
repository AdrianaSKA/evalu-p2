// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDR1rXmqmTTFIlHVaen0K4rtyft-Q-SvqI",
  authDomain: "evalu-p2.firebaseapp.com",
  projectId: "evalu-p2",
  storageBucket: "evalu-p2.firebasestorage.app",
  messagingSenderId: "8234970791",
  appId: "1:8234970791:web:32d9df6ec62211a8d5b582"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics();
export const db = getFirestore(app);
export const auth = getAuth(app);