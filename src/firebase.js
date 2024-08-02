// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqq1Bl1xDDd9wV1Sq-ZdQyei7dxaFiVWw",
  authDomain: "financly-48898.firebaseapp.com",
  projectId: "financly-48898",
  storageBucket: "financly-48898.appspot.com",
  messagingSenderId: "297396114613",
  appId: "1:297396114613:web:1f217245755fccd6d11afc",
  measurementId: "G-Y6V5HLJW88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };