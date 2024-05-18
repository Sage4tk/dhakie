import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import firebase_config from "@/config/firebase.config";

/** FIREBASE SERVICES **/
export const app = initializeApp(firebase_config);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);