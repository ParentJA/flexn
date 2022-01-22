import { atom, selector } from 'recoil';

export const tokenState = atom({
  key: 'tokenState',
  default: null,
});

export const accessTokenState = selector({
  key: 'accessTokenState',
  get: ({ get }) => {
    const token = get(tokenState);
    if (token !== null && 'access' in token) {
      return token.access;
    }
    return null;
  },
});

export const refreshTokenState = selector({
  key: 'refreshTokenState',
  get: ({ get }) => {
    const token = get(tokenState);
    if (token !== null && 'refresh' in token) {
      return token.refresh;
    }
    return null;
  },
});

export const userState = selector({
  key: 'userState',
  get: ({ get }) => {
    const accessToken = get(accessTokenState);
    if (accessToken !== null) {
      const [, payload] = accessToken.split('.');
      const decoded = window.atob(payload);
      return JSON.parse(decoded);
    }
    return null;
  },
});
