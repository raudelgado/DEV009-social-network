import login from '../src/components/login.js';
import { logInWithEmail, resetPassword } from '../src/lib/index';

jest.mock('../src/lib/index', () => ({
  logInWithGoogle: jest.fn(() => Promise.resolve()),
  resetPassword: jest.fn(() => Promise.resolve()),
}));

const navigateToMock = jest.fn();
const loginElement = login(navigateToMock);
const resetPasswordElement = resetPassword(navigateToMock);

describe('función Login', () => {
  /* beforeEach(() => {
    logInWithEmail.mockClear();
  }); */
  test('Al volver tiene que ir a la pagina /home', () => {
    const btnReturn = loginElement.querySelector('.button-return');
    btnReturn.click();
    expect(navigateToMock).toHaveBeenCalledWith('/');
  });

  const loginForm = loginElement.querySelector('form');
  const emailInput = loginForm.querySelector('input[type="email"]');
  const passwordInput = loginForm.querySelector('input[type="password"]');// const forgotPassword = loginForm.querySelector('input[type="button"]');
  const modalMessage = loginForm.querySelector('p');

  emailInput.value = 'test@example.com';
  passwordInput.value = '123456';

  test('Debe llamar a la funcion logInWithEmail con dos parametros', async () => {
    logInWithEmail.mockRejectedValue();
    loginForm.submit();
    await Promise.resolve();
    expect(logInWithEmail).toHaveBeenCalledWith('test@example.com', '123456');
    expect(modalMessage.textContent).toBe('Recuerda verificar tu correo. Si ya lo verificaste, revisa tus credenciales.');
  });
  it('debe devolver un error si el correo no esta verificado', () => {
    logInWithEmail.mockResolvedValue();
    loginForm.submit();
    expect(logInWithEmail).toHaveBeenCalledWith('test@example.com', '123456');
    expect(modalMessage.textContent).toThrow('Debes verificar tu correo electrónico.');
  });
});

describe('Función resetPassword', () => {
  beforeEach(() => {
    resetPassword.mockClear();
  });
  test('Al seleccionar debe abrir modal con input', () => {
    const btnForgotPassword = resetPasswordElement.querySelector('.forgot-password');
    btnForgotPassword.click();
    expect(navigateToMock).toHaveBeenCalledWith('form');
  });
});
