// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { getStorage, ref, uploadBytes } from "firebase/storage";

// import getAnalytics from "firebase/compat/analytics";
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsY9wltm3-KWOnzKbo_3vdGecoNHVwBPY",
  authDomain: "ondjala-catering-service.firebaseapp.com",
  projectId: "ondjala-catering-service",
  storageBucket: "ondjala-catering-service.appspot.com",
  messagingSenderId: "943865084720",
  appId: "1:943865084720:web:c017e96e617431e60fe6f5",
  measurementId: "G-TSVH04MNEC"
};


firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();

// const analytics = getAnalytics(app);