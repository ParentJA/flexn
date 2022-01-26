import React from 'react';
import { groupBy, keyBy, map } from 'lodash';
import { Card, ListGroup } from 'react-bootstrap';

import SetDetail from './SetDetail';

export default function WorkoutDetail({ workout }) {
  const setsByExerciseId = groupBy(workout.sets, (set) => {
    return set.exercise;
  });

  const exerciseById = keyBy(workout.exercises, 'id');

  const exerciseIds = map(workout.exercises, 'id');

  const content = (
    <Card>
      <Card.Header as="h5">{workout.name}</Card.Header>
      <ListGroup variant="flush">
        {exerciseIds.map((id) => (
          <ListGroup.Item key={id}>
            <strong>{exerciseById[id].name}:</strong>{' '}
            <SetDetail sets={setsByExerciseId[id]} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );

  return content;
}
