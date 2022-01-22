import axios from 'axios';

export const destroyProgram = async (accessToken, programId) => {
  const url = `/api/program/${programId}/`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await axios.delete(url, { headers });
    return { data: response.data, isError: false };
  } catch (error) {
    return { data: error.response.data, isError: true };
  }
};

export const retrieveProgram = async (accessToken, programId) => {
  const url = `/api/program/${programId}/`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await axios.get(url, { headers });
    return { data: response.data, isError: false };
  } catch (error) {
    return { data: error.response.data, isError: true };
  }
};

export const updateProgram = async (accessToken, programId, program) => {
  const url = `/api/program/${programId}/`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await axios.post(url, program, { headers });
    return { data: response.data, isError: false };
  } catch (error) {
    return { data: error.response.data, isError: true };
  }
};

export const listPrograms = async (accessToken) => {
  const url = `/api/program/`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await axios.get(url, { headers });
    return { data: response.data, isError: false };
  } catch (error) {
    return { data: error.response.data, isError: true };
  }
};

export const destroyUserProgram = async (accessToken, userId, programId) => {
  const url = `/api/user/${userId}/program/${programId}/`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await axios.delete(url, { headers });
    return { data: response.data, isError: false };
  } catch (error) {
    return { data: error.response.data, isError: true };
  }
};

export const retrieveUserProgram = async (accessToken, userId, programId) => {
  const url = `/api/user/${userId}/program/${programId}/`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await axios.get(url, { headers });
    return { data: response.data, isError: false };
  } catch (error) {
    return { data: error.response.data, isError: true };
  }
};

export const updateUserProgram = async (
  accessToken,
  userId,
  programId,
  userProgram
) => {
  const url = `/api/user/${userId}/program/${programId}/`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await axios.post(url, userProgram, { headers });
    return { data: response.data, isError: false };
  } catch (error) {
    return { data: error.response.data, isError: true };
  }
};

export const createUserProgram = async (accessToken, userId, programId) => {
  const url = `/api/user/${userId}/program/`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await axios.post(
      url,
      { user: userId, program: programId },
      { headers }
    );
    return { data: response.data, isError: false };
  } catch (error) {
    return { data: error.response.data, isError: true };
  }
};

export const createUserWorkout = async (accessToken, userId, workoutId) => {
  const url = `/api/user/${userId}/workout/`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await axios.post(
      url,
      { user: userId, workout: workoutId },
      { headers }
    );
    return { data: response.data, isError: false };
  } catch (error) {
    return { data: error.response.data, isError: true };
  }
};

export const createUserSet = async (
  accessToken,
  userId,
  userProgramId,
  userWorkoutId,
  exerciseId,
  reps,
  weight,
  include_bodyweight,
  warm_up
) => {
  const url = `/api/user/${userId}/set/`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await axios.post(
      url,
      {
        user_program: userProgramId,
        user_workout: userWorkoutId,
        exercise: exerciseId,
        reps,
        weight,
        include_bodyweight,
        warm_up,
      },
      { headers }
    );
    return { data: response.data, isError: false };
  } catch (error) {
    return { data: error.response.data, isError: true };
  }
};
