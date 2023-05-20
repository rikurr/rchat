// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { FIREBASE_ENV } from "@/constants/env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_ENV.FIREBASE_API_KEY,
  authDomain: FIREBASE_ENV.FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_ENV.FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_ENV.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_ENV.FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_ENV.FIREBASE_APP_ID,
  measurementId: FIREBASE_ENV.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const initializeFirebaseApp = () =>
  !getApps().length ? initializeApp(firebaseConfig) : getApp();
