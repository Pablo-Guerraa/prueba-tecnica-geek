// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID
};
// const firebaseConfig = {
//   apiKey: "AIzaSyChewqdjdMJvpRFYU3lAwPB4U0fBx16n34",
//   authDomain: "prueba-tecnica-geek-4f4e5.firebaseapp.com",
//   projectId: "prueba-tecnica-geek-4f4e5",
//   storageBucket: "prueba-tecnica-geek-4f4e5.appspot.com",
//   messagingSenderId: "666461373932",
//   appId: "1:666461373932:web:85366b1b5334cdc7096cc9"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export {
  app,
  db
}