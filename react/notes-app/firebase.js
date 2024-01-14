import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCOgYo0U08K1PndFDXjMsNsKR5r19V2K08",
  authDomain: "react-notes-app-8a024.firebaseapp.com",
  projectId: "react-notes-app-8a024",
  storageBucket: "react-notes-app-8a024.appspot.com",
  messagingSenderId: "279496861888",
  appId: "1:279496861888:web:428684bb29f44b641f6525"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");

