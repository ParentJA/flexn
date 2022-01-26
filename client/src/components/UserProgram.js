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
      <h1>Program: {userProgram.id}</h1>
      {content}
    </>
  );
}
