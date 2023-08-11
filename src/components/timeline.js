import { auth } from '../firebase/initializeFirebase.js';
import { signOutSession, createPost, displayUserPosts } from '../lib/index.js';

function timeline(navigateTo) {
  const main = document.createElement('main');
  main.className = 'main-timeline';

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

  const home = document.createElement('a');
  home.setAttribute('href', '');
  home.textContent = 'Home';

  const iconHome = document.createElement('img');
  iconHome.src = 'components/images/Home.png';
  iconHome.className = 'icon-navbar';

  divHome.append(iconHome, home);

  // div-perfil
  const divProfile = document.createElement('div');
  divProfile.className = 'div-profile';

  const profile = document.createElement('a');
  profile.setAttribute('href', '');
  profile.textContent = 'Mi Perfil';

  const iconProfile = document.createElement('img');
  iconProfile.src = 'components/images/Usuario.png';
  iconProfile.className = 'icon-navbar';

  divProfile.append(iconProfile, profile);

  // div-mispost
  const divUserPosts = document.createElement('div');
  divUserPosts.className = 'user-posts';

  const userPosts = document.createElement('a');
  userPosts.setAttribute('href', '');
  userPosts.textContent = 'Mis Posts';

  const iconUserPosts = document.createElement('img');
  iconUserPosts.src = 'components/images/Post.png';
  iconUserPosts.className = 'icon-navbar';

  divUserPosts.append(iconUserPosts, userPosts);

  // div escribir post
  const divNewPost = document.createElement('div');
  divNewPost.className = 'div-new-posts';

  const newPosts = document.createElement('a');
  newPosts.setAttribute('href', '');
  newPosts.textContent = 'Nuevo Post';

  const iconNewPost = document.createElement('img');
  iconNewPost.src = 'components/images/NuevoPost.png';
  iconNewPost.className = 'icon-navbar';

  divNewPost.append(iconNewPost, newPosts);

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

  const section = document.createElement('section');
  section.className = 'main-section';

  const sectionTitle = document.createElement('p');
  sectionTitle.textContent = '¿Que historia quieres escribir hoy?';

  const formPost = document.createElement('form');

  const postTitle = document.createElement('input');
  postTitle.className = 'post-title';
  postTitle.setAttribute('type', 'text');
  postTitle.setAttribute('placeholder', 'Ingrese un titulo');

  const postBody = document.createElement('textarea');
  postBody.className = 'post-body';
  postBody.setAttribute('placeholder', 'Escribe tu historia aqui...');
  postBody.setAttribute('rows', '5');
  postBody.setAttribute('cols', '50');
  postBody.setAttribute('maxlength', '1500');

  const btnPost = document.createElement('button');
  btnPost.className = 'btn-post';
  btnPost.textContent = 'Post';

  const divPost = document.createElement('div');
  divPost.className = 'post-timeline';

  links.append(divProfile, divHome, divUserPosts, divNewPost);
  menu.append(close, links, signOutBtn);
  formPost.append(postTitle, postBody, btnPost);
  section.append(sectionTitle, formPost);
  main.append(open, menu, pageTitle, section, divPost);

  formPost.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = postTitle.value;
    const content = postBody.value;

    const user = auth.currentUser;
    const username = user.displayName;

    await createPost(username, title, content);
    formPost.reset();
    displayUserPosts(user);
  });

  /* divMisPost.addEventListener('click', () => {
    const user = auth.currentUser;
  }); */

  return main;
}

export default timeline;
