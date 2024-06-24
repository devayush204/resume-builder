// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIUaHAcQL4oEZIprUwGnKXHf17QmYANk8",
  authDomain: "resume-builder-b9b57.firebaseapp.com",
  projectId: "resume-builder-b9b57",
  storageBucket: "resume-builder-b9b57.appspot.com",
  messagingSenderId: "189534951643",
  appId: "1:189534951643:web:a43f33566cb2a18f3814fe",
  measurementId: "G-2WM7T5HP4G"
};


const app = initializeApp(firebaseConfig);

const Auth = getAuth(app)
const Provider = new GoogleAuthProvider()
const db = getFirestore(app)






export {Auth, Provider, db};