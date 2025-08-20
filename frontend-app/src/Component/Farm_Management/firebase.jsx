import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // add this import

const firebaseConfig = {
  apiKey: "AIzaSyDSvJlIw6qy4LOBEZqCSO8mYpTCdXKIHtY",
  authDomain: "farmerm-ebd73.firebaseapp.com",
  projectId: "farmerm-ebd73",
  storageBucket: "farmerm-ebd73.appspot.com",
  messagingSenderId: "1017979354523",
  appId: "1:1017979354523:web:14dcca7ff274ed3b91f53e",
  measurementId: "G-W6RT771FJ3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);   // export Firestore db here
