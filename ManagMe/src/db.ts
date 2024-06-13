// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCsNPVu4Zc9Eh5y4fjA-dq-YReYtRiJUA",
  authDomain: "managme-2f8a4.firebaseapp.com",
  projectId: "managme-2f8a4",
  storageBucket: "managme-2f8a4.appspot.com",
  messagingSenderId: "236012288722",
  appId: "1:236012288722:web:b1d582f5f4730d1f8d0b0b",
  measurementId: "G-NKNC0ZQHHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



export default db;