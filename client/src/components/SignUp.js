import React, { useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userState } from '../state/Auth';

function SignUp() {
  const [isSubmitted, setSubmitted] = useState(false);
  const user = useRecoilValue(userState);

  const onSubmit = async (values, actions) => {
    const url = `/api/sign_up/`;
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('first_name', values.firstName);
    formData.append('last_name', values.lastName);
    formData.append('password1', values.password);
    formData.append('password2', values.password);
    formData.append('photo', values.photo);
    try {
      await axios.post(url, formData);
      setSubmitted(true);
    } catch (response) {
      const data = response.response.data;
      for (const value in data) {
        actions.setFieldError(value, data[value].join(' '));
      }
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  if (isSubmitted) {
    return <Navigate to="/log-in" />;
  }

  return (
    <>
      <h1>Sign up</h1>
      <Formik
        initialValues={{
          username: '',
          firstName: '',
          lastName: '',
          password: '',
          photo: [],
        }}
        onSubmit={onSubmit}
      >
        {({
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          values,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                className={'username' in errors ? 'is-invalid' : ''}
                name="username"
                onChange={handleChange}
                required
                type="username"
                value={values.username}
              />
              {'username' in errors && (
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First name:</Form.Label>
              <Form.Control
                className={'firstName' in errors ? 'is-invalid' : ''}
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
              />
              {'firstName' in errors && (
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last name:</Form.Label>
              <Form.Control
                className={'lastName' in errors ? 'is-invalid' : ''}
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
              />
              {'lastName' in errors && (
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                className={'password1' in errors ? 'is-invalid' : ''}
                name="password"
                onChange={handleChange}
                required
                type="password"
                value={values.password}
              />
              {'password1' in errors && (
                <Form.Control.Feedback type="invalid">
                  {errors.password1}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="photo">
              <Form.Label>Photo:</Form.Label>
              <Form.Control
                className={'photo' in errors ? 'is-invalid' : ''}
                name="photo"
                onChange={(event) => {
                  setFieldValue('photo', event.currentTarget.files[0]);
                }}
                required
                type="file"
              />
              {'photo' in errors && (
                <Form.Control.Feedback type="invalid">
                  {errors.photo}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <div className="d-grid mb-3">
              <Button disabled={isSubmitting} type="submit" variant="primary">
                Sign up
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <p className="text-center">
        Already have an account? <Link to="/log-in">Log in!</Link>
      </p>
    </>
  );
}

export default SignUp;
