// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0AwNCuh3awG6PHKeRz_mi0H-44XFlhco",
  authDomain: "taka-earth.firebaseapp.com",
  projectId: "taka-earth",
  storageBucket: "taka-earth.appspot.com",
  messagingSenderId: "322631696794",
  appId: "1:322631696794:web:c631f4be9da0211369fa23"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
