import React, { useState } from 'react';
import axios from 'axios';
import {
  Button, Container, Form, Navbar
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import LogIn from './components/LogIn';
import Root from './components/Root.js';
import SignUp from './components/SignUp';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App () {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return window.localStorage.getItem('flexn.auth') !== null;
  });

  const logIn = async (username, password) => {
    const url = `/api/log_in/`;
    try {
      const response = await axios.post(url, { username, password });
      window.localStorage.setItem(
        'flexn.auth', JSON.stringify(response.data)
      );
      setLoggedIn(true);
      return { response, isError: false };
    } catch (error) {
      console.error(error);
      return { response: error, isError: true };
    }
  };

  const logOut = () => {
    window.localStorage.removeItem('flexn.auth');
    setLoggedIn(false);
  };

  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout
            isLoggedIn={isLoggedIn}
            logOut={logOut}
          />
        }
      >
        <Route index element={<Root isLoggedIn={isLoggedIn} />} />
        <Route
          path='sign-up'
          element={
            <SignUp isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path='log-in'
          element={
            <LogIn
              isLoggedIn={isLoggedIn}
              logIn={logIn}
            />
          }
        />
      </Route>
    </Routes>
  );
}

function Layout ({ isLoggedIn, logOut }) {
  return (
    <>
      <Navbar bg='light' expand='lg' variant='light'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='logo'>Flexn</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse>
            {
              isLoggedIn && (
                <Form className='ms-auto'>
                  <Button type='button' onClick={() => logOut()}>Log out</Button>
                </Form>
              )
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className='pt-3'>
        <Outlet />
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
