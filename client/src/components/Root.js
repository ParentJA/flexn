import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useRecoilValue } from 'recoil';

import Program from './Program';
import { userState } from '../state/Auth';

export default function Root() {
  const user = useRecoilValue(userState);

  const loggedOutContent = (
    <div className="middle-center">
      <h1 className="landing">Flexn</h1>
      <ButtonGroup>
        <LinkContainer to="/sign-up">
          <Button>Sign up</Button>
        </LinkContainer>
        <LinkContainer to="/log-in">
          <Button>Log in</Button>
        </LinkContainer>
      </ButtonGroup>
    </div>
  );

  const loggedInContent = (
    <React.Suspense fallback={<>Loading...</>}>
      <Program />
    </React.Suspense>
  );

  return user ? loggedInContent : loggedOutContent;
}
