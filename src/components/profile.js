import { auth } from '../firebase/initializeFirebase.js';
import {
  signOutSession,
  displayUserPosts,
} from '../lib/index.js';

function profile(navigateTo) {
  const main = document.createElement('main');
  main.className = 'main-perfil';

  const pageTitle = document.createElement('h2');
  pageTitle.textContent = 'SpookyVerse';
  pageTitle.className = 'timeline-title';

  const menu = document.createElement('nav');
  menu.className = 'sidenav';

  const open = document.createElement('span');
  open.className = 'open';
  open.innerHTML = '<div></div><div></div><div></div>';
  open.addEventListener('click', () => {
    menu.style.display = 'block';
  });

  const close = document.createElement('span');
  close.className = 'gg-close-o';
  close.addEventListener('click', () => {
    menu.style.display = 'none';
  });

  const links = document.createElement('div');
  links.className = 'nav-links';

  // div-home
  const divHome = document.createElement('div');
  divHome.className = 'div-home';

  const home = document.createElement('button');
  home.textContent = 'Home';
  home.className = 'buttons-nav';

  const iconHome = document.createElement('img');
  iconHome.src = 'components/images/Home.png';
  iconHome.className = 'icon-navbar';

  divHome.append(iconHome, home);

  // div-perfil
  const divProfile = document.createElement('div');
  divProfile.className = 'div-profile';

  const profileSection = document.createElement('button');
  profileSection.textContent = 'Mi Perfil';
  profileSection.className = 'buttons-nav';

  const iconProfile = document.createElement('img');
  iconProfile.src = 'components/images/Usuario.png';
  iconProfile.className = 'icon-navbar';

  divProfile.append(iconProfile, profileSection);

  // div-mispost
  const divUserPosts = document.createElement('div');
  divUserPosts.className = 'user-posts';

  const userPosts = document.createElement('button');
  userPosts.textContent = 'Mis Posts';
  userPosts.className = 'buttons-nav';

  const iconUserPosts = document.createElement('img');
  iconUserPosts.src = 'components/images/Post.png';
  iconUserPosts.className = 'icon-misPosts';

  divUserPosts.append(iconUserPosts, userPosts);

  // Cerrar Sesion
  const signOutBtn = document.createElement('img');
  signOutBtn.src = 'components/images/button-sign-out.png';
  signOutBtn.className = 'button-sign-out';
  signOutBtn.addEventListener('click', () => {
    signOutSession()
      .then(() => {
        navigateTo('/');
      })
      .catch((error) => {
        throw error;
      });
  });

  const divInfoUser = document.createElement('div');
  divInfoUser.className = 'divInfoUser';

  const allPosts = document.createElement('div');
  allPosts.className = 'post-all-users';

  const postsByUser = document.createElement('div');
  postsByUser.className = 'post-by-user';

  // Usuario presente
  const user = auth.currentUser;

  // Foto de usuario
  const userphoto = document.createElement('div');
  userphoto.className = 'photo-user';

  if (user && user.photoURL) {
    const userPhotoImg = document.createElement('img');
    userPhotoImg.src = user.photoURL;
    userPhotoImg.alt = 'Foto de Usuario';
    userPhotoImg.className = 'user-photo-img';
    userphoto.appendChild(userPhotoImg);
  } else {
    const sinUserPhoto = document.createElement('img');
    sinUserPhoto.src = 'components/images/logo.png';
    sinUserPhoto.className = 'user-noPhoto';
    userphoto.appendChild(sinUserPhoto);
  }

  // DIV nombre usuario
  const divnametext = document.createElement('div');
  divnametext.className = 'divnametext';

  const usernametext = document.createElement('p');
  usernametext.className = 'textinput';
  usernametext.textContent = 'Nombre';

  const username = document.createElement('input');
  username.className = 'name-user';
  username.setAttribute('type', 'text');
  username.setAttribute('required', '');

  if (user && user.displayName) {
    username.value = user.displayName;
  }

  // DIV email usuario
  const divemailtext = document.createElement('div');
  divemailtext.className = 'divemailtext';

  const usermailtext = document.createElement('p');
  usermailtext.className = 'textinput';
  usermailtext.textContent = 'Correo';

  const useremail = document.createElement('input');
  useremail.className = 'mail-user';
  useremail.setAttribute('type', 'text');
  useremail.setAttribute('required', '');

  if (user && user.email) {
    useremail.value = user.email;
  }

  links.append(divProfile, divHome, divUserPosts);
  divnametext.append(usernametext, username);
  divemailtext.append(usermailtext, useremail);
  divInfoUser.append(userphoto, divnametext, divemailtext);
  menu.append(close, links, signOutBtn);
  main.append(open, menu, pageTitle, divInfoUser);

  // Evento para el boton mis posts en el menu
  divUserPosts.addEventListener('click', () => {
    displayUserPosts(user);
    allPosts.style.display = 'none';
    postsByUser.style.display = 'block';
    menu.style.display = 'none';
  });

  divHome.addEventListener('click', () => {
    navigateTo('/timeline');
  });

  divProfile.addEventListener('click', () => {
    navigateTo('/perfil');
  });

  return main;
}

export default profile;
