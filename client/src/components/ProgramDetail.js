import React from 'react';
import { Stack } from 'react-bootstrap';

import WorkoutDetail from './WorkoutDetail';

export default function ProgramDetail({ program }) {
  const content = program.workouts.map((workout) => (
    <WorkoutDetail key={workout.id} workout={workout} />
  ));

  return (
    <>
      <h1>{program.name}</h1>
      <p className="lead">
        {program.total_workouts} workouts, {program.duration_in_days} days
      </p>
      <Stack gap={3}>{content}</Stack>
    </>
  );
}
