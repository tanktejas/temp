// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzKddwos928jN36__Nz1MPVjR4o8rxNyU",
  authDomain: "temporary-for-devlogin.firebaseapp.com",
  projectId: "temporary-for-devlogin",
  storageBucket: "temporary-for-devlogin.appspot.com",
  messagingSenderId: "67140546818",
  appId: "1:67140546818:web:a72b5f87ef1dff4190921b",
  measurementId: "G-QB88GBMF8F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
