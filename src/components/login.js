import { logInWithEmail } from '../lib/index.js';

function login(navigateTo) {
  const main = document.createElement('main');

  const title = document.createElement('h3');
  title.textContent = 'Ingrese al SpookyVerse';

  const logologin = document.createElement('img');
  logologin.src = 'components/images/logo.png';
  logologin.setAttribute('id', 'logo-login-join');

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
  forgotPassword.className = 'forgot-password';
  forgotPassword.setAttribute('type', 'click');
  forgotPassword.textContent = 'Olvidé mi contraseña';

  const resetDiv = document.createElement('div');
  resetDiv.className = 'modal';

  const resetDivContent = document.createElement('div');
  resetDivContent.className = 'modal-content';

  const close = document.createElement('span');
  close.textContent = '&times;';
  close.className = 'close';

  const resetMessage = document.createElement('p');
  resetMessage.textContent = 'Te enviaremos un link para recuperar la contraseña.';
  resetMessage.classList = 'reset-message';

  const formReset = document.createElement('form');
  formReset.setAttribute('id', 'formReset');

  const resetInput = document.createElement('input');
  resetInput.setAttribute('type', 'email');
  resetInput.setAttribute('placeholder', 'Correo electrónico');
  resetInput.setAttribute('required', '');
  resetInput.className = 'reset-input';

  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'OK';
  resetBtn.className = 'reset-btn';

  resetDiv.append(resetDivContent);
  formReset.append(resetInput, resetBtn);
  resetDivContent.append(close, resetMessage, formReset);
  buttonEnd.append(btnReturn, btnEnter);
  loginForm.append(emailInput, passwordInput, forgotPassword, buttonEnd);
  main.append(title, logologin, loginForm);

  // Evento que envia el formulario y llama la función para hacer login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    logInWithEmail(email, password)
      .then(() => {
        navigateTo('/timeline');
      })
      .catch(() => {
        navigateTo('/');
      });
  });

  return main;
}

export default login;
