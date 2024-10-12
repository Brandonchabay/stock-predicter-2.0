// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB_cxiTxNSy6z6SJP5tJ-iup8G1Epae36g",
  authDomain: "stockpreditor-c0433.firebaseapp.com",
  projectId: "stockpreditor-c0433",
  storageBucket: "stockpreditor-c0433.appspot.com",
  messagingSenderId: "199862552555",
  appId: "1:199862552555:web:996407ab3371cf2623fbae",
  measurementId: "G-G6PWQQBCLR",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
