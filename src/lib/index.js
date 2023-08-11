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
  updateProfile,
  sendPasswordResetEmail,
  signOut,
} from '../firebase/initializeFirebase.js';
// import { collection, addDoc } from "firebase/firestore";

export const createAccount = (email, password, username) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(userCredential.user, { displayName: username });
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
export const userStat = () => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid, 'logeado');
    } else {
      console.log('Usuario no logeado');
    }
  });
};

export const signOutSession = () => signOut(auth);

export const resetPassword = (email) => sendPasswordResetEmail(auth, email);

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
export async function createPost(user, titulo, body) {
  try {
    const data = {
      user: user,
      title: titulo,
      content: body,
    };
    const docPost = await addDoc(collection(db, 'Post'), data);
    console.log('Document written with ID: ', docPost.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export const createUserPost = async (user, containerElement) => {
  const postsQuery = query(collection(db, 'posts'), where('author', '==', user.displayName));
  const postsSnapshot = await getDocs(postsQuery);

  containerElement.innerHTML = '';

  postsSnapshot.forEach((doc) => {
    const post = doc.data();
    const postElement = document.createElement('div');
    postElement.classList.add('user-post');
    postElement.innerHTML = `
    <div class="post-author">
    <img src="${user.photoURL || './img/person-circle.svg'}" class="user-avatar" />
    ${post.author}
    </div>
    <div class="post-content">${post.content}</div>
    <div class="post-date">${post.date.toDate().toLocaleDateString()}</div>
`;
    containerElement.appendChild(postElement);
  });
};
