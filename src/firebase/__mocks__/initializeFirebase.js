/* eslint-disable object-curly-spacing */
export const auth = jest.fn();
export const createUserWithEmailAndPassword = jest.fn(() => Promise.resolve({}));
export const sendEmailVerification = jest.fn(() => Promise.resolve({}));
export const signInWithEmailAndPassword = jest.fn(() => Promise.resolve({}));
export const signOut = jest.fn(() => Promise.resolve({}));
export const sendPasswordResetEmail = jest.fn(() => Promise.resolve({}));
export const updateProfile = jest.fn(() => Promise.resolve({}));
export const signInWithPopup = jest.fn((_auth_, provider) => {
  const user = {
    uid: 'Example123',
    displayName: 'Example User',
    email: 'user@example.com',
    photoURL: 'https://example.com/example-user-photo.jpg',
  };
  return Promise.resolve({ user, provider });
});
export const GoogleAuthProvider = { credentialFromResult: jest.fn(() => ({ accessToken: 'mockingAnAccessCode123' }))};
