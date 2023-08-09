import { signOutSession } from '../lib/index.js';

function timeline(navigateTo) {
  const main = document.createElement('main');
  main.className = 'main-timeline';

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

  links.append(profile, userPosts);
  menu.append(close, links, signOutBtn);
  section.append(sectionTitle, postTitle, postBody, btnPost);
  main.append(open, menu, title, section);

  return main;
}

export default timeline;
