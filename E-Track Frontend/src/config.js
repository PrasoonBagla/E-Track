import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC2zAP5l3p0TkNdKb0_hBld4pSMfDHRAQk",
  authDomain: "blink-357cb.firebaseapp.com",
  projectId: "blink-357cb",
  storageBucket: "blink-357cb.appspot.com",
  messagingSenderId: "286162503584",
  appId: "1:286162503584:web:42495304cac576eef346c5",
  measurementId: "G-E587VR811Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider ();
export {auth,provider};