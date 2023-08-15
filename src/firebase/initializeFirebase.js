import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocs,
  getDoc,
  where,
  query,
  serverTimestamp,
  orderBy,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { firebaseConfig } from './configFirebase.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // conexion base datos

export {
  app,
  auth,
  provider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  db,
  collection,
  addDoc,
  updateProfile,
  doc,
  getDocs,
  getDoc,
  where,
  query,
  serverTimestamp,
  orderBy,
  deleteDoc,
  updateDoc,
};
