// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9p6s-Cxfuk1r6glPF_mje5ncztidOZXA",
  authDomain: "friends-e6a70.firebaseapp.com",
  projectId: "friends-e6a70",
  storageBucket: "friends-e6a70.appspot.com",
  messagingSenderId: "671413862082",
  appId: "1:671413862082:web:064ec660cf0f33ec6f455b",
  measurementId: "G-CHVCXCF41Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
export { app, db, analytics };
