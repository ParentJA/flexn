import React from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';

import { postUserWorkoutProgress } from '../services/Api';
import { currentWorkoutState, userProgramState } from '../state/Core';
import { accessTokenState, userState } from '../state/Auth';

export default function UserSetForm({ nextSet, setUserWorkoutProgress }) {
  const accessToken = useRecoilValue(accessTokenState);
  const currentWorkout = useRecoilValue(currentWorkoutState);
  const user = useRecoilValue(userState);
  const userProgram = useRecoilValue(userProgramState);

  const onSubmit = async (values, actions) => {
    const { data, isError } = await postUserWorkoutProgress(
      accessToken,
      user.id,
      currentWorkout.workout_id,
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
    } else {
      actions.resetForm();
      setUserWorkoutProgress(data);
    }
  };

  return (
    <Formik
      initialValues={{
        reps: 0,
        weight: 0,
        includeBodyweight: false,
        warmUp: false,
        isSkipped: false,
        skipReason: '',
      }}
      onSubmit={onSubmit}
    >
      {({ errors, handleChange, handleSubmit, isSubmitting, values }) => (
        <Form noValidate onSubmit={handleSubmit}>
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
              type="switch"
              value={values.includeBodyweight}
            />
          </div>
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
          {/* <div className="mb-3">
              <Form.Check
                label="Warm up"
                name="warmUp"
                type="switch"
                value={values.warmUp}
              />
            </div> */}
          <div className="mb-3">
            <Form.Check
              label="Skip"
              name="isSkipped"
              type="switch"
              value={values.isSkipped}
            />
          </div>
          <Form.Group className="mb-3" controlId="skipReason">
            <Form.Label>Skip reason:</Form.Label>
            <Form.Control
              as="textarea"
              className={'skipReason' in errors ? 'is-invalid' : ''}
              name="skipReason"
              onChange={handleChange}
              placeholder="Why are you skipping this set?"
              value={values.skipReason}
            />
            {'skipReason' in errors && (
              <Form.Control.Feedback type="invalid">
                {errors.skipReason}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="d-grid">
            <Button disabled={isSubmitting} type="submit" variant="primary">
              Add
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
