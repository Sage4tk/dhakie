import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase_config from "@/config/firebase.config";

/** FIREBASE SERVICES **/
export const app = initializeApp(firebase_config);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

/** OAUTH SERVICES **/
export const GOOGLE_PROVIDER = new GoogleAuthProvider();