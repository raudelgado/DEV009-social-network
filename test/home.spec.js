import home from '../src/components/home.js';

const navigateToMock = jest.fn();

describe('Home Function', () => {
  test('Crea los elementos correctos', () => {
    const homeElement = home(navigateToMock);
    const title = homeElement.querySelector('h1');
    const slogan = homeElement.querySelector('#slogan-home');
    const logo = homeElement.querySelector('#logo-home');
    const loginButton = homeElement.querySelector('.btn-home-login');
    const joinButton = homeElement.querySelector('.btn-home-join');
    expect(title.textContent).toBe('SpookyVerse');
    expect(slogan.textContent).toBe('¡Donde las pesadillas se comparten!');
    expect(logo.getAttribute('src')).toBe('components/images/logo.png');
    expect(loginButton.textContent).toBe('Iniciar Sesion');
    expect(joinButton.textContent).toBe('Crear cuenta');
  });

  test('Al hacer click tiene que ir a la pagina /login', () => {
    const homeElement = home(navigateToMock);
    const loginButton = homeElement.querySelector('.btn-home-login');
    loginButton.click();
    expect(navigateToMock).toHaveBeenCalledWith('/login');
  });

  test('Al hacer click tiene que ir a la pagina /join', () => {
    const homeElement = home(navigateToMock);
    const joinButton = homeElement.querySelector('.btn-home-join');
    joinButton.click();
    expect(navigateToMock).toHaveBeenCalledWith('/join');
  });
});
