/* eslint-disable no-alert */
/* eslint-disable import/named */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
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
  onAuthStateChanged,
  collection,
  db,
  addDoc,
  updateProfile,
  getDocs,
  where,
  query,
  orderBy,
  deleteDoc,
  doc,
} from '../firebase/initializeFirebase.js';

export const createAccount = (email, password, username) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(userCredential.user, {
        displayName: username,
      });
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
      console.log(token, user);
      return { user, token };
    });
};

// crear carpeta con post
export async function createPost(username, titulo, body, timestamp) {
  try {
    const data = {
      author: username,
      title: titulo,
      content: body,
      date: timestamp,
    };
    const docPost = await addDoc(collection(db, 'Post'), data);
    console.log('Document written with ID: ', docPost.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

// Eliminar Post
export const deletePost = (postId) => deleteDoc(doc(db, 'Post', postId));

// Mostrar post solo de un usuario
export async function displayUserPosts(user) {
  try {
    const querySnapshot = await getDocs(query(collection(db, 'Post'), where('author', '==', user.displayName), orderBy('date', 'desc')));
    const postsSection = document.querySelector('.post-by-user');

    querySnapshot.forEach((file) => {
      const data = file.data();
      const postId = file.id;

      const postDiv = document.createElement('div');
      postDiv.className = 'post';
      postDiv.setAttribute('data-post-id', postId);

      const author = document.createElement('h3');
      author.textContent = `${data.author}`;
      author.className = 'author';

      const title = document.createElement('h3');
      title.textContent = data.title;
      title.className = 'title-post';

      const content = document.createElement('p');
      content.textContent = data.content;
      content.className = 'content';

      const divEndPost = document.createElement('div');
      divEndPost.className = 'divEndPost';

      const divReaction = document.createElement('div');
      divReaction.className = 'divReaction';

      const reaction = document.createElement('button');
      reaction.textContent = '#';
      reaction.className = 'num-reaction';

      const reactionImg = document.createElement('img');
      reactionImg.src = 'components/images/fantasma.png';
      reactionImg.className = 'img-endPost';

      const divDeleEdit = document.createElement('div');
      divDeleEdit.className = 'divDeleEdit';

      const modal = document.querySelector('.modal-delete');

      const deletePostImg = document.createElement('img');
      deletePostImg.src = 'components/images/delete.png';
      deletePostImg.className = 'img-endPost';
      deletePostImg.addEventListener('click', () => {
        modal.style.display = 'block';

        const buttonDelete = document.querySelector('.modal-delete-confirm');
        buttonDelete.addEventListener('click', () => {
          deletePost(postId);
          postDiv.remove();
          modal.style.display = 'none';
        });
      });

      const editPostImg = document.createElement('img');
      editPostImg.src = 'components/images/edit.png';
      editPostImg.className = 'img-endPost';

      divReaction.append(reaction, reactionImg);
      divDeleEdit.append(deletePostImg, editPostImg);
      divEndPost.append(divReaction, divDeleEdit);
      postDiv.append(author, title, content, divEndPost);
      postsSection.appendChild(postDiv);
    });
  } catch (e) {
    console.error('Error fetching documents: ', e);
  }
}

export async function displayAllPosts() {
  try {
    const querySnapshot = await getDocs(query(collection(db, 'Post'), orderBy('date', 'desc')));
    const postsSection = document.querySelector('.post-all-users');

    querySnapshot.forEach((file) => {
      const data = file.data();

      const postDiv = document.createElement('div');
      postDiv.className = 'post';

      const author = document.createElement('h3');
      author.textContent = `${data.author}`;
      author.className = 'author';

      const title = document.createElement('h3');
      title.textContent = data.title;
      title.className = 'title-post';

      const content = document.createElement('p');
      content.textContent = data.content;
      content.className = 'content';

      const divEndPost = document.createElement('div');
      divEndPost.className = 'divEndPost';

      const divReaction = document.createElement('div');
      divReaction.className = 'divReaction';

      const reaction = document.createElement('button');
      reaction.textContent = '#';
      reaction.className = 'num-reaction';

      const reactionImg = document.createElement('img');
      reactionImg.src = 'components/images/fantasma.png';
      reactionImg.className = 'img-endPost';

      divReaction.append(reaction, reactionImg);
      divEndPost.append(divReaction);
      postDiv.append(author, title, content, divEndPost);
      postsSection.appendChild(postDiv);
    });
  } catch (e) {
    console.error('Error fetching documents: ', e);
  }
}
