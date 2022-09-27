// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import * as firebase from "firebase";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYkVh1R1EBjWRWi423njlQ2XnCW7lKhFU",
  authDomain: "all-client-project-17622.firebaseapp.com",
  projectId: "all-client-project-17622",
  storageBucket: "all-client-project-17622.appspot.com",
  messagingSenderId: "884086258372",
  appId: "1:884086258372:web:4b4e07f829c02811e3e791",
  measurementId: "G-53Z5F3M6CJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "app");
// console.log(firebase);
// const app = firebase.app();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
