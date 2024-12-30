// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//! authentication and Google import
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6JwW7TC_DPMzdO57CrP81ZeckerqBX4c",
  authDomain: "new-project-firebase---chat.firebaseapp.com",
  projectId: "new-project-firebase---chat",
  storageBucket: "new-project-firebase---chat.firebasestorage.app",
  messagingSenderId: "912110256105",
  appId: "1:912110256105:web:b24566bb73185135865578",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//! authentication referansı frontende alma kurulumu
export const auth = getAuth(app);

//! google sağlayıcısının kurucusu
export const provider = new GoogleAuthProvider();

//! veritabanının referansını al (kurulum)
export const db = getFirestore(app);
