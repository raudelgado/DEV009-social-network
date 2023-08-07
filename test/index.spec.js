import {
  createAccount,
  logInWithEmail,
  signOutSession,
  resetPassword,
} from '../src/lib/index';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from '../src/firebase/initializeFirebase';

jest.mock('../src/firebase/initializeFirebase');

describe('createAccount', () => {
  it('deberia crear un usuario con correo y contraseña', () => createAccount('test@example.com', '123456').then(() => {
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', '123456');
  }));
});

describe('logInWithEmail', () => {
  it('permitir un usuario ingresar con un email y contraseña ya registrados', () => logInWithEmail('test@example.com', '123456').then(() => {
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', '123456');
  }));
});

describe('signOutSession', () => {
  it('deberia cerrar sessión', () => signOutSession(auth).then(() => {
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith(auth);
  }));
});

describe('resetPassword', () => {
  it('deberia enviar un correo al email ingresado', () => resetPassword('test@example.com').then(() => {
    expect(sendPasswordResetEmail).toHaveBeenCalledTimes(1);
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, 'test@example.com');
  }));
});
