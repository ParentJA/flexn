import React, { useEffect, useState } from 'react';
import { keyBy } from 'lodash';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';

import ExerciseLabel from './ExerciseLabel';
import UserSetForm from './UserSetForm';
import WorkoutReview from './WorkoutReview';
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
  const currentSet = userWorkoutProgress?.curr_set;
  const currentSetIndex = userWorkoutProgress?.curr_set_index;
  const currentExercise = exerciseById[currentSet?.exercise];
  const nextSet = userWorkoutProgress?.next_set;
  const nextExercise = nextSet ? exerciseById[nextSet?.exercise] : null;

  const content =
    currentSet != null ? (
      <>
        <p className="lead">
          <ExerciseLabel exercise={currentExercise} set={currentSet} />
        </p>
        <UserSetForm
          currentExercise={currentExercise}
          currentSet={currentSet}
          currentSetIndex={currentSetIndex}
          nextExercise={nextExercise}
          nextSet={nextSet}
          setUserWorkoutProgress={setUserWorkoutProgress}
        />
      </>
    ) : (
      <>
        <p className="lead">
          Congratulations, you completed the workout! Click below to mark it
          completed.
        </p>
        <WorkoutReview />
        <div className="d-grid mt-3">
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
