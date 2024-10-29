// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "restaurantfinder-c04ef.firebaseapp.com",
  projectId: "restaurantfinder-c04ef",
  storageBucket: "restaurantfinder-c04ef.appspot.com",
  messagingSenderId: "474704028819",
  appId: "1:474704028819:web:cbd0cabb462f19ff949966",
  measurementId: "G-5CV7GMPRSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth }; 

