/* eslint-disable no-undef */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable jest/valid-expect */
import { createAccount } from '../src/lib/index';

jest.mock('firebase/app');

describe('createAccount', () => {
  it('debería ser una función', () => {
    expect(typeof createAccount).toBe('function');
  });
  // haveBeenCalledWith()
});
