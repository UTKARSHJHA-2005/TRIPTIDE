import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAnF5Agv35PxSqF9b0xbVJ2QadM-ruLXGI",
  authDomain: "triptide-2524f.firebaseapp.com",
  projectId: "triptide-2524f",
  storageBucket: "triptide-2524f.firebasestorage.app",
  messagingSenderId: "481827444156",
  appId: "1:481827444156:web:ebccc8ebe45b34014707b9"
};
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage()