import React, { useRef, useState } from 'react';
import { Field, Formik } from 'formik';
import { Alert, Button, Collapse, Form } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';

import ExerciseLabel from './ExerciseLabel';
import { postUserWorkoutProgress } from '../services/Api';
import {
  currentWorkoutState,
  lastWorkoutSameTypeState,
  userProgramState,
} from '../state/Core';
import { accessTokenState, userState } from '../state/Auth';

export default function UserSetForm({
  currentExercise,
  currentSet,
  currentSetIndex,
  nextExercise,
  nextSet,
  setUserWorkoutProgress,
}) {
  const includeBodyweightCheckbox = useRef(null);
  const isSkippedCheckbox = useRef(null);
  const skipReasonDiv = useRef(null);
  const [showSkipReason, setShowSkipReason] = useState(false);

  const accessToken = useRecoilValue(accessTokenState);
  const currentWorkout = useRecoilValue(currentWorkoutState);
  const lastWorkoutSameType = useRecoilValue(lastWorkoutSameTypeState);
  const user = useRecoilValue(userState);
  const userProgram = useRecoilValue(userProgramState);

  const onSubmit = async (values, actions) => {
    const { data, isError } = await postUserWorkoutProgress(
      accessToken,
      user.id,
      currentWorkout.workout_id,
      userProgram.id,
      currentWorkout.id,
      currentSet.exercise,
      values.reps,
      values.weight,
      values.includeBodyweight,
      values.isSkipped,
      values.skipReason,
      values.isWarmUp
    );
    if (isError) {
      for (const value in data) {
        actions.setFieldError(value, data[value].join(' '));
      }
    } else {
      actions.resetForm();
      // Workaround for Formik not resetting the checkboxes
      includeBodyweightCheckbox.current.checked = false;
      isSkippedCheckbox.current.checked = false;
      setShowSkipReason(false);
      setUserWorkoutProgress(data);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (values.isSkipped) {
      if (values.skipReason.length < 1) {
        errors.skipReason = 'You must provide a reason for skipping a set.';
      }
    } else {
      if (!values.includeBodyweight && values.weight === 0) {
        errors.weight = 'Weight must be greater than 0.';
      }
      if (values.reps === 0) {
        errors.reps = 'Reps must be greater than 0.';
      }
    }
    return errors;
  };

  const lastSetSameType = lastWorkoutSameType?.user_sets[currentSetIndex];

  const content = (() => {
    if (lastSetSameType) {
      if (lastSetSameType.is_skipped) {
        return 'You skipped this set last time you did this workout with the following reason:';
      }
      let lastSetText = `${lastSetSameType.weight} pounds`;
      let currentSetText = `${lastSetSameType.weight + 10} pounds`;
      if (currentExercise.include_bodyweight) {
        lastSetText =
          lastSetSameType.weight > 0
            ? `your bodyweight plus ${lastSetSameType.weight} pounds`
            : 'your bodyweight';
        currentSetText = `your bodyweight plus ${
          lastSetSameType.weight + 10
        } pounds`;
      }
      return (
        'Last time you lifted ' +
        lastSetText +
        ' for ' +
        lastSetSameType.reps +
        ' reps. Try to lift ' +
        currentSetText +
        ' for ' +
        currentSet.min_reps +
        ' reps this time.'
      );
    }
    return '';
  })();

  const alert = lastSetSameType ? (
    <Alert variant={lastSetSameType?.is_skipped ? 'warning' : 'info'}>
      {lastSetSameType?.is_skipped ? (
        <>
          <p>{content}</p>
          <hr />
          <p className="mb-0">{lastSetSameType?.skip_reason}</p>
        </>
      ) : (
        content
      )}
    </Alert>
  ) : (
    <Alert variant="info">
      This is the first time you've done this exercise for this program.
    </Alert>
  );

  return (
    <>
      {alert}
      <Formik
        initialValues={{
          reps: 0,
          weight: 0,
          // includeBodyweight: currentExercise.include_bodyweight,
          includeBodyweight: false,
          isWarmUp: false,
          isSkipped: false,
          skipReason: '',
        }}
        onSubmit={onSubmit}
        validate={validate}
      >
        {({ errors, handleChange, handleSubmit, isSubmitting, values }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="weight">
              <Form.Label>Weight:</Form.Label>
              <Form.Control
                className={'weight' in errors ? 'is-invalid' : ''}
                name="weight"
                onChange={handleChange}
                type="number"
                value={values.weight}
              />
              {'weight' in errors && (
                <Form.Control.Feedback type="invalid">
                  {errors.weight}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Field name="includeBodyweight">
              {({ field }) => (
                <div className="mb-3">
                  <Form.Check
                    {...field}
                    id="includeBodyWeight"
                    label="Include bodyweight"
                    onClick={() => console.log(field)}
                    ref={includeBodyweightCheckbox}
                    type="switch"
                  />
                </div>
              )}
            </Field>
            <Form.Group className="mb-3" controlId="reps">
              <Form.Label>Reps:</Form.Label>
              <Form.Control
                className={'reps' in errors ? 'is-invalid' : ''}
                name="reps"
                onChange={handleChange}
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
                checked={values.warmUp}
                label="Warm up"
                name="warmUp"
                type="switch"
              />
            </div> */}
            <Field name="isSkipped">
              {({ field }) => (
                <div className="mb-3">
                  <Form.Check
                    {...field}
                    id="isSkipped"
                    label="Skip"
                    onClick={() => {
                      setShowSkipReason(!field.value);
                    }}
                    ref={isSkippedCheckbox}
                    type="switch"
                  />
                </div>
              )}
            </Field>
            <Collapse in={showSkipReason}>
              <Form.Group
                className="mb-3"
                controlId="skipReason"
                ref={skipReasonDiv}
              >
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
            </Collapse>
            <div className="d-grid">
              <Button disabled={isSubmitting} type="submit" variant="primary">
                Add
              </Button>
              <div className="form-text text-center">
                <strong>Next set:</strong>{' '}
                <ExerciseLabel exercise={nextExercise} set={nextSet} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
