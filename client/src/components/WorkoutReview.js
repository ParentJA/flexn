import React, { useEffect, useState } from 'react';
import { groupBy, includes, map } from 'lodash';
import { ListGroup } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';

import { getUserWorkoutSummary } from '../services/Api';
import { accessTokenState, userState } from '../state/Auth';
import { currentWorkoutState } from '../state/Core';

export default function WorkoutReview() {
  const [userWorkoutSummary, setUserWorkoutSummary] = useState(null);

  const accessToken = useRecoilValue(accessTokenState);
  const currentWorkout = useRecoilValue(currentWorkoutState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    const loadUserWorkoutSummary = async () => {
      const { data, isError } = await getUserWorkoutSummary(
        accessToken,
        user.id,
        currentWorkout.workout_id
      );
      if (!isError) {
        setUserWorkoutSummary(data);
      }
    };
    loadUserWorkoutSummary();
  }, [accessToken, user, currentWorkout]);

  if (userWorkoutSummary == null) {
    return <>Loading...</>;
  }

  const exercises = userWorkoutSummary?.exercises;
  const userSets = userWorkoutSummary?.user_sets;

  const userSetsByExercise = groupBy(userSets, 'exercise');

  const content = exercises.map((exercise) => {
    const sets = userSetsByExercise[exercise.id];
    const skipped = includes(map(sets, 'is_skipped'), true);
    const label = sets
      .map((set) => {
        if (set.is_skipped) {
          return 'Skipped';
        }
        return `${set.weight} pounds / ${set.reps} reps`;
      })
      .join(', ');
    return (
      <ListGroup.Item key={exercise.id} variant={skipped ? 'warning' : null}>
        <strong>{exercise.name}: </strong>
        {label}
      </ListGroup.Item>
    );
  });

  return <ListGroup>{content}</ListGroup>;
}
