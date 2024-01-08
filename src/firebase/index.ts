// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5VoFWCjn6A5EhTuUsnh75TsGCV4Z1aDg",
  authDomain: "ful-quiz.firebaseapp.com",
  projectId: "ful-quiz",
  storageBucket: "ful-quiz.appspot.com",
  messagingSenderId: "449387211227",
  appId: "1:449387211227:web:a074a349aeb3ef54e71ffe",
  name: "ful-quiz",
  options: {},
  automaticDataCollectionEnabled: false,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(firebaseConfig);
export const provider = new GoogleAuthProvider();
