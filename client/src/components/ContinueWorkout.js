import React from 'react';
import { Formik } from 'formik';
import { keyBy } from 'lodash';
import { Button, Form } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';

import { createUserSet } from '../services/Api';
import { currentWorkoutState, userProgramState } from '../state/Core';
import { accessTokenState, userState } from '../state/Auth';

export default function ContinueWorkout() {
  const accessToken = useRecoilValue(accessTokenState);
  const user = useRecoilValue(userState);
  const userProgram = useRecoilValue(userProgramState);
  const currentWorkout = useRecoilValue(currentWorkoutState);

  const exerciseById = keyBy(currentWorkout.exercises, 'id');
  const nextSet = currentWorkout.next_set;
  const nextExercise = exerciseById[nextSet.exercise];

  const onSubmit = async (values, actions) => {
    const { data, isError } = await createUserSet(
      accessToken,
      user.id,
      userProgram.id,
      currentWorkout.id,
      nextSet.exercise,
      values.reps,
      values.weight,
      values.includeBodyweight,
      values.warmUp
    );
    if (isError) {
      for (const value in data) {
        actions.setFieldError(value, data[value].join(' '));
      }
    }
  };

  return (
    <>
      <h2>{nextExercise.name}</h2>
      <p>
        <strong>
          {nextSet.min_reps}-{nextSet.max_reps} reps
        </strong>
      </p>
      <Formik
        initialValues={{
          reps: 0,
          weight: 0,
          includeBodyweight: false,
          warmUp: false,
        }}
        onSubmit={onSubmit}
      >
        {({ errors, handleChange, handleSubmit, isSubmitting, values }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="reps">
              <Form.Label>Reps:</Form.Label>
              <Form.Control
                className={'reps' in errors ? 'is-invalid' : ''}
                name="reps"
                onChange={handleChange}
                required
                type="number"
                value={values.reps}
              />
              {'reps' in errors && (
                <Form.Control.Feedback type="invalid">
                  {errors.reps}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="weight">
              <Form.Label>Weight:</Form.Label>
              <Form.Control
                className={'weight' in errors ? 'is-invalid' : ''}
                name="weight"
                onChange={handleChange}
                required
                type="number"
                value={values.weight}
              />
              {'weight' in errors && (
                <Form.Control.Feedback type="invalid">
                  {errors.weight}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <div className="mb-3">
              <Form.Check
                label="Include bodyweight"
                name="includeBodyweight"
                type="checkbox"
                value={values.includeBodyweight}
              />
            </div>
            <div className="mb-3">
              <Form.Check
                label="Warm up"
                name="warmUp"
                type="checkbox"
                value={values.warmUp}
              />
            </div>
            <div className="d-grid">
              <Button disabled={isSubmitting} type="submit" variant="primary">
                Add
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
