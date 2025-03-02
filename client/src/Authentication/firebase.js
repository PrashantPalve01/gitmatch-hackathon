import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwIFs-Av0P2TQjJP0UP-7aADbG8uuZga4",
  authDomain: "gitmatch-2ae6f.firebaseapp.com",
  databaseURL: "https://gitmatch-2ae6f-default-rtdb.firebaseio.com",
  projectId: "gitmatch-2ae6f",
  storageBucket: "gitmatch-2ae6f.appspot.com",
  messagingSenderId: "471977127566",
  appId: "1:471977127566:web:6504e24ca47afa0292a3df",
  measurementId: "G-WGHM7FB2V4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Enable Firestore persistence (offline support)
const initializeFirestore = async () => {
  try {
    await enableIndexedDbPersistence(db);
    console.log("Firestore persistence enabled");
  } catch (error) {
    console.error("Error enabling persistence:", error);
  }
};

// Uncomment the next line if you're using a local emulator
// connectFirestoreEmulator(db, 'localhost', 8080);

export { app, auth, db, initializeFirestore };