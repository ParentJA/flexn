import React from 'react';
import { useRecoilValue } from 'recoil';

import ContinueWorkout from './ContinueWorkout';
import StartWorkout from './StartWorkout';
import { currentWorkoutState, userProgramState } from '../state/Core';

export default function UserProgram() {
  const userProgram = useRecoilValue(userProgramState);
  const currentWorkout = useRecoilValue(currentWorkoutState);

  const content =
    currentWorkout == null ? <StartWorkout /> : <ContinueWorkout />;

  return (
    <>
      <p className="h2">{userProgram.program}</p>
      {content}
    </>
  );
}
