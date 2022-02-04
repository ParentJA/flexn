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

export const destroyUserProgram = async (
  accessToken,
  userId,
  userProgramId
) => {
  const url = `/api/user/${userId}/program/${userProgramId}/`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await axios.delete(url, { headers });
    return { data: response.data, isError: false };
  } catch (error) {
    return { data: error.response.data, isError: true };
  }
};

export const retrieveUserProgram = async (
  accessToken,
  userId,
  userProgramId
) => {
  const url = `/api/user/${userId}/program/${userProgramId}/`;
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
  userProgramId,
  userProgram
) => {
  const url = `/api/user/${userId}/program/${userProgramId}/`;
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

export const createUserWorkout = async (
  accessToken,
  userId,
  userProgramId,
  workoutId
) => {
  const url = `/api/user/${userId}/workout/`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await axios.post(
      url,
      { user: userId, user_program: userProgramId, workout: workoutId },
      { headers }
    );
    return { data: response.data, isError: false };
  } catch (error) {
    return { data: error.response.data, isError: true };
  }
};

export const updateUserWorkout = async (
  accessToken,
  userId,
  userWorkoutId,
  isCompleted,
  isSkipped,
  skipReason
) => {
  const url = `/api/user/${userId}/workout/${userWorkoutId}/`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await axios.patch(
      url,
      {
        is_completed: isCompleted,
        is_skipped: isSkipped,
        skip_reason: skipReason,
      },
      { headers }
    );
    return { data: response.data, isError: false };
  } catch (error) {
    return { data: error.response.data, isError: true };
  }
};

export const getUserProgress = async (accessToken, userId) => {
  const url = `/api/user/${userId}/progress/`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await axios.get(url, { headers });
    return { data: response.data, isError: false };
  } catch (error) {
    return { data: error.response.data, isError: true };
  }
};

export const getUserWorkoutProgress = async (
  accessToken,
  userId,
  userWorkoutId
) => {
  const url = `/api/user/${userId}/workout/${userWorkoutId}/progress/`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await axios.get(url, { headers });
    return { data: response.data, isError: false };
  } catch (error) {
    return { data: error.response.data, isError: true };
  }
};

export const postUserWorkoutProgress = async (
  accessToken,
  userId,
  workoutId,
  userProgramId,
  userWorkoutId,
  exerciseId,
  reps,
  weight,
  includeBodyweight,
  isSkipped,
  skipReason,
  isWarmUp
) => {
  const url = `/api/user/${userId}/workout/${workoutId}/progress/`;
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
        include_bodyweight: includeBodyweight,
        is_skipped: isSkipped,
        skip_reason: skipReason,
        is_warm_up: isWarmUp,
      },
      { headers }
    );
    return { data: response.data, isError: false };
  } catch (error) {
    return { data: error.response.data, isError: true };
  }
};

export const getUserWorkoutSummary = async (accessToken, userId, workoutId) => {
  const url = `/api/user/${userId}/workout/${workoutId}/summary/`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await axios.get(url, { headers });
    return { data: response.data, isError: false };
  } catch (error) {
    return { data: error.response.data, isError: true };
  }
};
