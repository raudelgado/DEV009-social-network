import home from '../src/components/home.js';
import { logInWithGoogle } from '../src/lib/index';

jest.mock('../src/lib/index', () => ({
  logInWithGoogle: jest.fn(() => Promise.resolve()),
}));

const navigateToMock = jest.fn();
const homeElement = home(navigateToMock);

describe('Home Function', () => {
  test('Al hacer click tiene que ir a la pagina /login', () => {
    const loginButton = homeElement.querySelector('.btn-home-login');
    loginButton.click();
    expect(navigateToMock).toHaveBeenCalledWith('/login');
  });

  test('Al hacer click tiene que ir a la pagina /join', () => {
    const joinButton = homeElement.querySelector('.btn-home-join');
    joinButton.click();
    expect(navigateToMock).toHaveBeenCalledWith('/join');
  });

  test('Cuando se haga click en el boton loginGoogle, debera llamar a logInWithGoogle y luego navegar a /timeline', async () => {
    const loginGoogle = homeElement.querySelector('.btn-home-google');
    loginGoogle.click();
    await Promise.resolve();
    expect(logInWithGoogle).toHaveBeenCalled();
    expect(navigateToMock).toHaveBeenCalledWith('/timeline');
  });
});
