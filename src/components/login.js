import { logInWithEmail, resetPassword } from '../lib/index.js';

function login(navigateTo) {
  const main = document.createElement('main');

  const title = document.createElement('h3');
  title.textContent = 'Ingrese al SpookyVerse';

  const logologin = document.createElement('img');
  logologin.src = 'components/images/logo.png';
  logologin.setAttribute('id', 'logo-login-join');

  // ****** COMENTARIO *****
  const loginForm = document.createElement('form');

  const emailInput = document.createElement('input');
  emailInput.className = 'input-login-join';
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('placeholder', 'Correo electronico');
  emailInput.setAttribute('required', '');

  const passwordInput = document.createElement('input');
  passwordInput.className = 'input-login-join';
  passwordInput.setAttribute('type', 'password');
  passwordInput.setAttribute('placeholder', 'Contraseña');
  passwordInput.setAttribute('required', '');

  const buttonEnd = document.createElement('div');
  buttonEnd.className = 'buttonEnd';

  const btnEnter = document.createElement('button');
  btnEnter.className = 'button-login';
  btnEnter.textContent = 'Entrar';
  btnEnter.setAttribute('type', 'submit');

  const btnReturn = document.createElement('button');
  btnReturn.className = 'button-return';
  btnReturn.textContent = 'Volver';
  btnReturn.setAttribute('type', 'button');
  btnReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  const forgotPassword = document.createElement('button');
  forgotPassword.setAttribute('type', 'button');
  forgotPassword.className = 'forgot-password';
  forgotPassword.textContent = 'Olvidé mi contraseña';

  // Tarjeta modal
  const modal = document.createElement('div');
  modal.className = 'modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const modalTitle = document.createElement('h4');
  modalTitle.textContent = 'SpookyVerse';
  modalTitle.className = 'modal-title';

  const close = document.createElement('span');
  close.className = 'gg-close-o';

  const modalMessage = document.createElement('p');
  modalMessage.textContent = 'Enviaremos un link para que puedas crear una nueva contraseña.';

  const modalForm = document.createElement('form');

  const modalInput = document.createElement('input');
  modalInput.setAttribute('type', 'email');
  modalInput.setAttribute('placeholder', 'Correo electrónico');
  modalInput.setAttribute('required', '');
  modalInput.className = 'modal-input';

  const modalBtn = document.createElement('button');
  modalBtn.textContent = 'Enviar';
  modalBtn.className = 'modal-btn';

  // Modal
  modal.append(modalContent);
  modalContent.append(modalTitle, close, modalMessage, modalForm);
  modalForm.append(modalInput, modalBtn);

  buttonEnd.append(btnReturn, btnEnter);
  loginForm.append(emailInput, passwordInput, buttonEnd);
  main.append(title, logologin, loginForm, forgotPassword, modal);

  // Evento que envia el formulario y llama la función para hacer login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    logInWithEmail(email, password)
      .then((user) => {
        if (!user.emailVerified) {
          throw new Error('Debes verificar tu correo electrónico');
        }
        navigateTo('/timeline');
      })
      .catch(() => {
        modal.style.display = 'block';
        modalMessage.textContent = 'Recuerda verificar tu correo. Si ya lo verificaste, revisa tus credenciales.';
        modalForm.remove(modalInput);
      });
  });

  // Evento al enviar formulario
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = modalInput.value;
    resetPassword(email)
      .then(() => {
        modal.style.display = 'block';
        modalMessage.textContent = '¡Listo! Revisa tu correo.';
        modalForm.remove(modalInput);
      })
      .catch(() => {
        modal.style.display = 'block';
        modalMessage.textContent = '¡Que mal! Correo invalido, verifica si lo escribiste bien.';
      });
  });

  // Evento modal
  forgotPassword.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  close.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  return main;
}

export default login;
