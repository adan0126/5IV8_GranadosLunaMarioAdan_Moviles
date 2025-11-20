// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmHpPPk4VP-8Wht9hi8YVh8C1Z_iVmAg0",
  authDomain: "bd-movil-5d9a5.firebaseapp.com",
  projectId: "bd-movil-5d9a5",
  storageBucket: "bd-movil-5d9a5.firebasestorage.app",
  messagingSenderId: "59509677368",
  appId: "1:59509677368:web:54758ed4197b97dec275cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);