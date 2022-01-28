import axios from 'axios';
import { selector } from 'recoil';

import { accessTokenState, userState } from './Auth';
import { getUserProgress } from '../services/Api';

export const userProgressState = selector({
  key: 'userProgressState',
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

export const programsState = selector({
  key: 'programsState',
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

export const userProgramState = selector({
  key: 'userProgramState',
  get: ({ get }) => {
    const userProgress = get(userProgressState);
    if (userProgress != null) {
      return userProgress.user_program;
    }
    return null;
  },
});

export const lastWorkoutState = selector({
  key: 'lastWorkoutState',
  get: ({ get }) => {
    const userProgress = get(userProgressState);
    return userProgress?.last_workout;
  },
});

export const lastWorkoutSameTypeState = selector({
  key: 'lastWorkoutSameTypeState',
  get: ({ get }) => {
    const userProgress = get(userProgressState);
    return userProgress?.last_workout_same_type;
  },
});

export const nextWorkoutState = selector({
  key: 'nextWorkoutState',
  get: ({ get }) => {
    const userProgress = get(userProgressState);
    return userProgress?.next_workout;
  },
});

export const currentWorkoutState = selector({
  key: 'currentWorkoutState',
  get: ({ get }) => {
    const userProgress = get(userProgressState);
    return userProgress?.curr_workout;
  },
});
