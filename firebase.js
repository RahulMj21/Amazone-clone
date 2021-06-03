import firebase from "firebase";
import { firestore } from "firebase-admin";
const firebaseConfig = {
  apiKey: "AIzaSyC6W0jMaviK66AuMaU9sWVsHjmRczT0xhM",
  authDomain: "fir-d1c12.firebaseapp.com",
  projectId: "fir-d1c12",
  storageBucket: "fir-d1c12.appspot.com",
  messagingSenderId: "923090075368",
  appId: "1:923090075368:web:b530ef69e71e653bdcd35d",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const db = app.firestore();
