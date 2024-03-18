// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsYhYyopnZpykpeIuKFAIrXhcBoyrquGc",
  authDomain: "comm-17b2f.firebaseapp.com",
  projectId: "comm-17b2f",
  storageBucket: "comm-17b2f.appspot.com",
  messagingSenderId: "794381618596",
  appId: "1:794381618596:web:5e8aac33ac677e0dff4531",
  measurementId: "G-TXVDVJM0TV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
