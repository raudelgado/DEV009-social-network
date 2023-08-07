import { signOutSession } from '../lib/index.js';

function timeline(navigateTo) {
  const main = document.createElement('main');

  const title = document.createElement('h2');
  title.textContent = 'SpookyVerse';
  title.className = 'timeline-title';

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

  const profile = document.createElement('a');
  profile.setAttribute('href', '');
  profile.textContent = 'Mi Perfil';

  const userPosts = document.createElement('a');
  userPosts.setAttribute('href', '');
  userPosts.textContent = 'Mis Posts';

  const signOutBtn = document.createElement('button');
  signOutBtn.className = 'btn-sign-out';
  signOutBtn.textContent = 'Cerrar sesión';
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

  const postTitle = document.createElement('input');
  postTitle.setAttribute('type', 'text');
  postTitle.setAttribute('placeholder', 'Ingrese un titulo');

  const postBody = document.createElement('input');
  postBody.setAttribute('type', 'textarea');
  postBody.setAttribute('placeholder', 'Escribe tu historia aqui...');

  const btnReturn = document.createElement('button');
  btnReturn.className = 'btn-return';
  btnReturn.textContent = 'Volver';
  btnReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  const btnPost = document.createElement('button');
  btnPost.className = 'btn-post';
  btnPost.textContent = 'Post';

  section.append(postTitle, postBody, btnReturn, btnPost);
  links.append(profile, userPosts);
  menu.append(close, links, signOutBtn);
  main.append(open, menu, title, section);

  return main;
}

export default timeline;
