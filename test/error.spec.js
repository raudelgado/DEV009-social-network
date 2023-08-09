import error from '../src/components/error.js';

describe('Error Funcion', () => {
  const navigateToMock = jest.fn();
  const errorElement = error(navigateToMock);
  test('Al hacer click tiene que ir a la pagina home', () => {
    const btnReturn = errorElement.querySelector('.button-back');
    btnReturn.click();
    expect(navigateToMock).toHaveBeenCalledWith('/');
  });
});
