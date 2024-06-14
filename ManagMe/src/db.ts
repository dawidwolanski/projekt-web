import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = { apiKey:
  "AIzaSyAVCZCJvHea4UzHaUZE5qE5JH122UloP6I",
  authDomain: "managme-4d420.firebaseapp.com",
   projectId: "managme-4d420", storageBucket: 
   "managme-4d420.appspot.com", messagingSenderId: 
   "203920141785", appId:
    "1:203920141785:web:fdd9ff33803cfa72a57dc8", 
    measurementId: "G-2CM663JMSP"
};

const app = initializeApp(firebaseConfig);


const db = getFirestore(app);



export default db;