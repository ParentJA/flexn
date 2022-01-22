import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useRecoilValue } from 'recoil';

import { userState } from '../state/Auth';

function Root() {
  const user = useRecoilValue(userState);

  return (
    <div className="middle-center">
      <h1 className="landing">Flexn</h1>
      {!user && (
        <ButtonGroup>
          <LinkContainer to="/sign-up">
            <Button>Sign up</Button>
          </LinkContainer>
          <LinkContainer to="/log-in">
            <Button>Log in</Button>
          </LinkContainer>
        </ButtonGroup>
      )}
    </div>
  );
}

export default Root;
