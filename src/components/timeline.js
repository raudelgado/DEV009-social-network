import { auth } from '../firebase/initializeFirebase.js';
import { signOutSession, createPost, userStat } from '../lib/index.js';

function timeline(navigateTo) {
  const main = document.createElement('main');
  main.className = 'main-timeline';

  const titleApp = document.createElement('h2');
  titleApp.textContent = 'SpookyVerse';
  titleApp.className = 'timeline-title';

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
  divHome.className = 'divHome';

  const home = document.createElement('a');
  home.setAttribute('href', '');
  home.textContent = 'Home';

  const imgHome = document.createElement('img');
  imgHome.src = 'components/images/Home.png';
  imgHome.className = 'imgInput';

  divHome.append(imgHome, home);

  // div-perfil
  const divMiPerfil = document.createElement('div');
  divMiPerfil.className = 'divMiPerfil';

  const profile = document.createElement('a');
  profile.setAttribute('href', '');
  profile.textContent = 'Mi Perfil';

  const imgPerfil = document.createElement('img');
  imgPerfil.src = 'components/images/Usuario.png';
  imgPerfil.className = 'imgInput';

  divMiPerfil.append(imgPerfil, profile);

  // div-mispost
  const divMisPost = document.createElement('div');
  divMisPost.className = 'divMisPost';

  const userPosts = document.createElement('a');
  userPosts.setAttribute('href', '');
  userPosts.textContent = 'Mis Posts';

  const imgMisPost = document.createElement('img');
  imgMisPost.src = 'components/images/Post.png';
  imgMisPost.className = 'imgInput';

  divMisPost.append(imgMisPost, userPosts);

  // div escribir post
  const divNewPost = document.createElement('div');
  divNewPost.className = 'divNewP';

  const newPosts = document.createElement('a');
  newPosts.setAttribute('href', '');
  newPosts.textContent = 'Nuevo Post';

  const imgNewPost = document.createElement('img');
  imgNewPost.src = 'components/images/NuevoPost.png';
  imgNewPost.className = 'imgInput';

  divNewPost.append(imgNewPost, newPosts);

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

  links.append(divMiPerfil, divHome, divMisPost, divNewPost);
  menu.append(close, links, signOutBtn);
  formPost.append(postTitle, postBody, btnPost);
  section.append(sectionTitle, formPost);
  main.append(open, menu, titleApp, section);

  formPost.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = postTitle.value;
    const content = postBody.value;
    const user = auth.currentUser;
    const author = user.displayName;
    await createPost(author, title, content);
    formPost.reset();
  });
  return main;
}

export default timeline;
