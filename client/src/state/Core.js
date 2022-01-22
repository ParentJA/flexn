import axios from 'axios';
import { selector } from 'recoil';

import { accessTokenState, userState } from './Auth';

export const userProgressQuery = selector({
  key: 'userProgressQuery',
  get: async ({ get }) => {
    const accessToken = get(accessTokenState);
    const user = get(userState);
    const url = `/api/user/${user.id}/progress/`;
    const headers = { Authorization: `Bearer ${accessToken}` };
    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      return null;
    }
  },
});

export const programListQuery = selector({
  key: 'programListQuery',
  get: async ({ get }) => {
    const accessToken = get(accessTokenState);
    const url = `/api/program/`;
    const headers = { Authorization: `Bearer ${accessToken}` };
    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      return null;
    }
  },
});
