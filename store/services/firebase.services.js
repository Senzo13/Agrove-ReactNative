// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { ref as sRef } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4858FBQ1o5wvbdfaH0k0WF6SqVeUwFsY",
  authDomain: "plantr-prod.firebaseapp.com",
  databaseURL: "https://plantr-prod.firebaseio.com",
  projectId: "plantr-prod",
  storageBucket: "plantr-prod.appspot.com",
  messagingSenderId: "515154813352",
  appId: "1:515154813352:web:c6255d6d736612a4b2fd9d",
  measurementId: "G-2TVWD5T09Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const storageRef = sRef(storage);