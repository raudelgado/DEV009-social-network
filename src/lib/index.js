/* eslint-disable import/named */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
import {
  auth,
  provider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  collection,
  db,
  addDoc,
} from '../firebase/initializeFirebase.js';
// import { collection, addDoc } from "firebase/firestore";

export const createAccount = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      sendEmailVerification(userCredential.user);
      return user;
    });
};

export const logInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      return user;
    });
};

// Estado del usuario
export const stateChanged = () => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid, 'logeado');
    } else {
      console.log('Usuario no logeado');
    }
  });
};

// export const signOutSession = () => signOut(auth);

// export const resetPassword = (email) => sendPasswordResetEmail(auth, email);

export const logInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      const photoURL = user.photoURL;
      console.log(token, user);
      return { user, token, photoURL };
    });
};

// crear carpeta con post
export async function createPost(titulo, body) {
  try {
    const data = {
      title: titulo,
      content: body,
    };
    const docPost = await addDoc(collection(db, 'Post'), data);
    console.log('Document written with ID: ', docPost.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
