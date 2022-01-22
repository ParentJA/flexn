import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { createUserSet } from '../services/Api';
import {
  accessTokenState,
  exerciseState,
  userProgramState,
  userState,
  userWorkoutState,
} from '../state/Auth';

export default function UserSet() {
  const [isSubmitted, setSubmitted] = useState(false);
  const accessToken = useRecoilValue(accessTokenState);
  const user = useRecoilValue(userState);
  const userProgram = useRecoilValue(userProgramState);
  const userWorkout = useRecoilValue(userWorkoutState);
  const exercise = useRecoilValue(exerciseState);

  const onSubmit = async (values, actions) => {
    const { data, isError } = await createUserSet(
      accessToken,
      user.id,
      userProgram.id,
      userWorkout.id,
      exercise.id,
      values.reps,
      values.weight,
      values.include_bodyweight,
      values.warm_up
    );
    if (isError) {
      for (const value in data) {
        actions.setFieldError(value, data[value].join(' '));
      }
    } else {
      setSubmitted(true);
    }
  };

  if (isSubmitted) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>Add set</h1>
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
            <Form.Group className="mb-3" controlId="includeBodyweight">
              <Form.Check
                className={'include_bodyweight' in errors ? 'is-invalid' : ''}
                label="Include Bodyweight"
                name="includeBodyweight"
                onChange={handleChange}
                required
                type="checkbox"
                value={values.includeBodyweight}
              />
              {'include_bodyweight' in errors && (
                <Form.Control.Feedback type="invalid">
                  {errors.include_bodyweight}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="warmUp">
              <Form.Check
                className={'warm_up' in errors ? 'is-invalid' : ''}
                label="Warm Up"
                name="warmUp"
                onChange={handleChange}
                required
                type="checkbox"
                value={values.warmUp}
              />
              {'warm_up' in errors && (
                <Form.Control.Feedback type="invalid">
                  {errors.warm_up}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <div className="d-grid mb-3">
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
