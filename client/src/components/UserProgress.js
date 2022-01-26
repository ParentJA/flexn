import React from 'react';
import { useRecoilValue } from 'recoil';

import ProgramTable from './ProgramTable';
import UserProgram from './UserProgram';
import { userProgressState } from '../state/Core';

export default function UserProgress() {
  const userProgress = useRecoilValue(userProgressState);

  const content =
    userProgress.user_program == null ? <ProgramTable /> : <UserProgram />;

  return <React.Suspense fallback={<>Loading...</>}>{content}</React.Suspense>;
}
