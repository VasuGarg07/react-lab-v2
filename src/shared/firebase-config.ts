import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAXxIktwocgCZgIaupZfDq4PWMGB0IeTaw",
    authDomain: "react-lab-v2.firebaseapp.com",
    projectId: "react-lab-v2",
    storageBucket: "react-lab-v2.appspot.com",
    messagingSenderId: "1000894281965",
    appId: "1:1000894281965:web:fefe32b721fa21db8b74e4",
    measurementId: "G-4NGTRQ794Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);