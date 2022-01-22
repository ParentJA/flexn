import React from 'react';
import { groupBy, keyBy, keys, reduce } from 'lodash';

function SetDetail({ sets }) {
  const content = reduce(
    sets,
    (result, value, index) => {
      let text = `${value.min_reps}-${value.max_reps} reps`;
      if (result.length > 0) {
        text = result + ', ' + text;
      }
      if (index === sets.length - 1) {
        text = text + ` (${value.training_type})`;
      }
      return text;
    },
    ''
  );

  return (
    <span>
      {sets.length} sets &ndash; {content}
    </span>
  );
}

export default function ProgramDetail({ program }) {
  const setsByWorkoutIdExerciseIdPair = groupBy(program.sets, (set) => {
    return [set.workout, set.exercise];
  });

  const exerciseIdsByWorkoutId = reduce(
    keys(setsByWorkoutIdExerciseIdPair),
    (result, value) => {
      const [workout, exercise] = (() => {
        const [a, b] = value.split(',');
        return [parseInt(a), parseInt(b)];
      })();
      if (result.hasOwnProperty(workout)) {
        result[workout].push(exercise);
      } else {
        result[workout] = [exercise];
      }
      return result;
    },
    {}
  );

  const exerciseById = keyBy(program.exercises, 'id');

  const content = program.workouts.map((workout) => (
    <div key={workout.id}>
      <h2>{workout.name}</h2>
      <ul>
        {exerciseIdsByWorkoutId[workout.id].map((exerciseId) => (
          <li key={exerciseId}>
            <strong>{exerciseById[exerciseId].name}:</strong>{' '}
            <SetDetail
              sets={setsByWorkoutIdExerciseIdPair[[workout.id, exerciseId]]}
            />
          </li>
        ))}
      </ul>
    </div>
  ));

  return (
    <>
      <h1>{program.name}</h1>
      <p>
        <strong>Duration (days):</strong>{' '}
        <span>{program.duration_in_days}</span>
        <br />
        <strong>Total Workouts:</strong> <span>{program.total_workouts}</span>
      </p>
      {content}
    </>
  );
}
