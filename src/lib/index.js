/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
import {
  auth,
  provider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from '../firebase/initializeFirebase.js';

// Crear cuenta con correo y contraseña
// Agregar nombre del usuario
export const createAccount = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      sendEmailVerification(userCredential.user);
      return user;
    });
};

// Ingresar con correo y contraseña
export const logInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      return user;
    });
};

// Cerrar sessión
export const signOutSession = () => signOut(auth);

// Resetar contraseña
export const resetPassword = (email) => sendPasswordResetEmail(auth, email);

// Ingresar con Google
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
