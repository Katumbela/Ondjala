// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXKbx634X3Q8dcMiXjHseVzQiAFMvmSdY",
  authDomain: "reputa360.firebaseapp.com",
  projectId: "reputa360",
  storageBucket: "reputa360.appspot.com",
  messagingSenderId: "37758184858",
  appId: "1:37758184858:web:1d40d66b1441f2bf6f9e23",
  measurementId: "G-9MR1JLWZ81"
};


firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();