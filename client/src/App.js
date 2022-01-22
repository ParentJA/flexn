import React from 'react';
import axios from 'axios';
import { Button, Container, Form, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import LogIn from './components/LogIn';
import Root from './components/Root';
import SignUp from './components/SignUp';
import { tokenState, userState } from './state/Auth';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const navigate = useNavigate();
  const setToken = useSetRecoilState(tokenState);

  const logIn = async (username, password) => {
    const url = `/api/log_in/`;
    try {
      const response = await axios.post(url, { username, password });
      setToken(response.data);
      return {
        response,
        isError: false,
      };
    } catch (error) {
      console.error(error);
      setToken(null);
      return {
        response: error,
        isError: true,
      };
    }
  };

  const logOut = () => {
    setToken(null);
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<Layout logOut={logOut} />}>
        <Route index element={<Root />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="log-in" element={<LogIn logIn={logIn} />} />
      </Route>
    </Routes>
  );
}

function Layout({ logOut }) {
  const user = useRecoilValue(userState);

  return (
    <>
      <Navbar bg="light" expand="lg" variant="light">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="logo">Flexn</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse>
            {user && (
              <Form className="ms-auto">
                <Button type="button" onClick={() => logOut()}>
                  Log out
                </Button>
              </Form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="pt-3">
        <Outlet />
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
