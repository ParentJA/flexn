import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';

import WorkoutDetail from './WorkoutDetail';
import { createUserWorkout } from '../services/Api';
import { accessTokenState, userState } from '../state/Auth';
import {
  nextWorkoutState,
  userProgramState,
  userProgressState,
} from '../state/Core';

export default function StartWorkout() {
  const accessToken = useRecoilValue(accessTokenState);
  const user = useRecoilValue(userState);
  const userProgram = useRecoilValue(userProgramState);
  const nextWorkout = useRecoilValue(nextWorkoutState);
  const refreshUserProgress = useRecoilRefresher_UNSTABLE(userProgressState);

  const startWorkout = async () => {
    const { isError } = await createUserWorkout(
      accessToken,
      user.id,
      userProgram.id,
      nextWorkout.id
    );
    if (!isError) {
      refreshUserProgress();
    }
  };

  return (
    <Stack gap={3}>
      <WorkoutDetail workout={nextWorkout} />
      <div className="d-grid">
        <Button onClick={() => startWorkout()} variant="primary">
          Start
        </Button>
      </div>
    </Stack>
  );
}
