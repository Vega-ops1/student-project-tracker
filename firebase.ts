// app/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config (จากรูปที่คุณส่ง)
const firebaseConfig = {
  apiKey: "AIzaSyDfYP5kOpefNobhkMC-628czSON-nnjl6g",
  authDomain: "student-project-tracker-27397.firebaseapp.com",
  projectId: "student-project-tracker-27397",
  storageBucket: "student-project-tracker-27397.firebasestorage.app",
  messagingSenderId: "703259216493",
  appId: "1:703259216493:web:5f8af91df2d8c414098d64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// services
export const auth = getAuth(app);
export const db = getFirestore(app);
