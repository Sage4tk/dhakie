import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase_config from "@/config/firebase.config";

/** FIREBASE SERVICES **/
export const app = initializeApp(firebase_config);
export const analytics = getAnalytics(app);