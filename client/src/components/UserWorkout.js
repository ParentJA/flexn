import React from 'react';
import { useRecoilValue } from 'recoil';

import WorkoutDetail from './WorkoutDetail';
import { userProgressQuery } from '../state/Core';

export default function UserWorkout() {
  const userProgress = useRecoilValue(userProgressQuery);
  const lastWorkout = userProgress.data.last_workout;

  if (lastWorkout === null) {
    return (
      <>
        <p>User has never started a workout for this program.</p>
        <WorkoutDetail />
      </>
    );
  } else {
    if (lastWorkout.is_completed) {
      return (
        <>
          <p>User never completed their last workout.</p>
          <WorkoutDetail />
        </>
      );
    } else {
      return (
        <>
          <p>
            User completed their last workout and is ready for a new workout.
          </p>
          <WorkoutDetail />
        </>
      );
    }
  }
}
