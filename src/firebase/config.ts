// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGuShKbVh9Mj7dpNVpC1e3Yy5DZHt8bZc",
  authDomain: "journalapp-eaccb.firebaseapp.com",
  projectId: "journalapp-eaccb",
  storageBucket: "journalapp-eaccb.appspot.com",
  messagingSenderId: "179355809138",
  appId: "1:179355809138:web:ecf889a2a0f8bce11519eb",
  measurementId: "G-JGFW48J6QE"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseBD = getFirestore(firebaseApp);