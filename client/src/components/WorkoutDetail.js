import React from 'react';
import { groupBy, keyBy, map } from 'lodash';

import SetDetail from './SetDetail';

export default function WorkoutDetail({ workout }) {
  const setsByExerciseId = groupBy(workout.sets, (set) => {
    return set.exercise;
  });

  const exerciseById = keyBy(workout.exercises, 'id');

  const exerciseIds = map(workout.exercises, 'id');

  const content = (
    <div className="p-3 rounded shadow">
      <p className="h4">{workout.name}</p>
      <ul className="list-unstyled">
        {exerciseIds.map((id) => (
          <li key={id}>
            <strong>{exerciseById[id].name}:</strong>{' '}
            <SetDetail sets={setsByExerciseId[id]} />
          </li>
        ))}
      </ul>
    </div>
  );

  return content;
}
