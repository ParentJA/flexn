import React, { useEffect, useState } from 'react';
import { keyBy } from 'lodash';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';

import UserSetForm from './UserSetForm';
import { getUserWorkoutProgress, updateUserWorkout } from '../services/Api';
import { currentWorkoutState, userProgressState } from '../state/Core';
import { accessTokenState, userState } from '../state/Auth';
import { Button } from 'react-bootstrap';

export default function ContinueWorkout() {
  const [userWorkoutProgress, setUserWorkoutProgress] = useState(null);

  const accessToken = useRecoilValue(accessTokenState);
  const currentWorkout = useRecoilValue(currentWorkoutState);
  const user = useRecoilValue(userState);

  const refreshUserProgress = useRecoilRefresher_UNSTABLE(userProgressState);

  useEffect(() => {
    const loadUserWorkoutProgress = async () => {
      const { data, isError } = await getUserWorkoutProgress(
        accessToken,
        user.id,
        currentWorkout.workout_id
      );
      if (!isError) {
        setUserWorkoutProgress(data);
      }
    };
    loadUserWorkoutProgress();
  }, [accessToken, user, currentWorkout]);

  if (userWorkoutProgress == null) {
    return <>Loading...</>;
  }

  const markCompleted = async () => {
    const { isError } = await updateUserWorkout(
      accessToken,
      user.id,
      currentWorkout.id,
      true,
      false,
      null
    );
    if (!isError) {
      refreshUserProgress();
    }
  };

  const exerciseById = keyBy(currentWorkout.exercises, 'id');
  const nextSet = userWorkoutProgress?.next_set;
  const nextSetIndex = userWorkoutProgress?.next_set_index;
  const nextExercise = exerciseById[nextSet?.exercise];

  const content =
    nextSet != null ? (
      <>
        <p className="lead">
          {nextExercise.name}: {nextSet.min_reps}-{nextSet.max_reps} reps {'('}
          {nextSet.training_type}
          {')'}
        </p>
        <UserSetForm
          nextExercise={nextExercise}
          nextSet={nextSet}
          nextSetIndex={nextSetIndex}
          setUserWorkoutProgress={setUserWorkoutProgress}
        />
      </>
    ) : (
      <>
        <p className="lead">
          Congratulations, you completed the workout! Click below to mark it
          completed.
        </p>
        <div className="d-grid">
          <Button
            onClick={() => markCompleted()}
            type="button"
            variant="primary"
          >
            Mark completed
          </Button>
        </div>
      </>
    );

  return content;
}
