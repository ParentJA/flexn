import React from 'react';
import { groupBy, keyBy, keys, reduce } from 'lodash';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';

import SetDetail from './SetDetail';

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
    <Col>
      <Card key={workout.id}>
        <Card.Header as="h5">{workout.name}</Card.Header>
        <ListGroup variant="flush">
          {exerciseIdsByWorkoutId[workout.id].map((exerciseId) => (
            <ListGroup.Item key={exerciseId}>
              <strong>{exerciseById[exerciseId].name}:</strong>{' '}
              <SetDetail
                sets={setsByWorkoutIdExerciseIdPair[[workout.id, exerciseId]]}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Col>
  ));

  return (
    <Row>
      <Col>
        <h1>{program.name}</h1>
        <p>
          <strong>Duration (days):</strong>{' '}
          <span>{program.duration_in_days}</span>
          <br />
          <strong>Total Workouts:</strong> <span>{program.total_workouts}</span>
        </p>
        <Row className="row-cols-md-1 row-cols-lg-3 g-4">{content}</Row>
      </Col>
    </Row>
  );
}
