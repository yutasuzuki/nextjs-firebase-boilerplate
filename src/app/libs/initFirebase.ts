import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfing from "../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfing);
}

export const db = firebase.firestore();
export const auth = firebase.auth();
