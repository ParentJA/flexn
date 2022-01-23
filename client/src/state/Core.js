import axios from 'axios';
import { selector } from 'recoil';

import { accessTokenState, userState } from './Auth';
import { getUserProgress } from '../services/Api';

export const userProgressQuery = selector({
  key: 'userProgressQuery',
  get: async ({ get }) => {
    const accessToken = get(accessTokenState);
    const user = get(userState);
    const { data, isError } = await getUserProgress(accessToken, user.id);
    if (!isError) {
      return data;
    }
    return null;
  },
});

export const listProgramsQuery = selector({
  key: 'listProgramsQuery',
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
