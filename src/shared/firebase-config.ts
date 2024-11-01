import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const devConfig = {
    apiKey: "AIzaSyAXxIktwocgCZgIaupZfDq4PWMGB0IeTaw",
    authDomain: "react-lab-v2.firebaseapp.com",
    projectId: "react-lab-v2",
    storageBucket: "react-lab-v2.appspot.com",
    messagingSenderId: "1000894281965",
    appId: "1:1000894281965:web:fefe32b721fa21db8b74e4",
    measurementId: "G-4NGTRQ794Z"
};

const prodConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(import.meta.env.DEV ? devConfig : prodConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);