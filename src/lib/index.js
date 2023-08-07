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
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
} from '../firebase/initializeFirebase.js';

export const createAccount = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      sendEmailVerification(userCredential.user);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      alert('Ya existe una cuenta para ese correo electrónico o el correo es inválido.');
    });
};

export const logInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      return user;
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
      throw error;
    });
};

export const logInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(token, user);
      return [user, token];
      // IdP data available using getAdditionalUserInfo(result)
    // ...
    }).catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, email, credential);
      alert(errorMessage);
      throw error;
    });
};

export const signOutSession = () => {
  return signOut(auth)
    .then(() => {
      console.log('Sesión cerrada con éxito.');
    }).catch(() => {
      console.log('Error al cerrar sesión.');
    });
};

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('Email sent.');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};
