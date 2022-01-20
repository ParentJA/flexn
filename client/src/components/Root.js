import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Root ({ isLoggedIn }) {
  return (
    <div className='middle-center'>
      <h1 className='landing'>Flexn</h1>
      {
        !isLoggedIn && (
          <ButtonGroup>
            <LinkContainer to='/sign-up'><Button>Sign up</Button></LinkContainer>
            <LinkContainer to='/log-in'><Button>Log in</Button></LinkContainer>
          </ButtonGroup>
        )
      }
    </div>
  );
}

export default Root;