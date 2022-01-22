import React, { useState } from 'react';
import { Formik } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userState } from '../state/Auth';

function LogIn({ logIn }) {
  const [isSubmitted, setSubmitted] = useState(false);
  const user = useRecoilValue(userState);

  const onSubmit = async (values, actions) => {
    try {
      const { response, isError } = await logIn(
        values.username,
        values.password
      );
      if (isError) {
        const data = response.response.data;
        for (const value in data) {
          const errorMessage = Array.isArray(data[value])
            ? data[value].join(' ')
            : data[value];
          actions.setFieldError(value, errorMessage);
        }
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (user || isSubmitted) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>Log in</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={onSubmit}
      >
        {({ errors, handleChange, handleSubmit, isSubmitting, values }) => (
          <>
            {'__all__' in errors && (
              <Alert variant="danger">{errors.__all__}</Alert>
            )}
            {'detail' in errors && (
              <Alert variant="danger">{errors.detail}</Alert>
            )}
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  name="username"
                  onChange={handleChange}
                  value={values.username}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                />
              </Form.Group>
              <div className="d-grid mb-3">
                <Button disabled={isSubmitting} type="submit" variant="primary">
                  Log in
                </Button>
              </div>
            </Form>
          </>
        )}
      </Formik>
      <p className="text-center">
        Don't have an account? <Link to="/sign-up">Sign up!</Link>
      </p>
    </>
  );
}

export default LogIn;
