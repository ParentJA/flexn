import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';

import ProgramDetail from './ProgramDetail';
import { accessTokenState, userState } from '../state/Auth';
import { listProgramsQuery, userProgressQuery } from '../state/Core';
import { createUserProgram, retrieveProgram } from '../services/Api';

export default function Program() {
  const userProgress = useRecoilValue(userProgressQuery);

  const content =
    userProgress === null || userProgress.data.user_program === null ? (
      <ProgramTable />
    ) : (
      <h1>It works!</h1>
    );

  return <React.Suspense fallback={<>Loading...</>}>{content}</React.Suspense>;
}

function ProgramTable() {
  const [program, setProgram] = useState(null);
  const [show, setShow] = useState(false);
  const refreshUserProgress = useRecoilRefresher_UNSTABLE(userProgressQuery);
  const accessToken = useRecoilValue(accessTokenState);
  const user = useRecoilValue(userState);
  const programs = useRecoilValue(listProgramsQuery);

  const programDetail = async (programId) => {
    const { data, isError } = await retrieveProgram(accessToken, programId);
    if (!isError) {
      setProgram(data);
      setShow(true);
    }
  };

  const selectProgram = async () => {
    const { data, isError } = await createUserProgram(
      accessToken,
      user.id,
      program.id
    );
    if (!isError) {
      refreshUserProgress(data);
    }
  };

  const tableBody =
    programs.length === 0 ? (
      <tr>
        <td colspan="3">No programs.</td>
      </tr>
    ) : (
      programs.map((program) => (
        <tr key={program.id} onClick={() => programDetail(program.id)}>
          <td>{program.name}</td>
          <td>{program.duration_in_days}</td>
          <td>{program.total_workouts}</td>
        </tr>
      ))
    );

  return (
    <>
      <Table bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration (days)</th>
            <th>Total Workouts</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </Table>
      <Modal
        fullscreen
        onClick={() => {
          setShow(false);
        }}
        show={show}
      >
        <Modal.Body>
          <ProgramDetail program={program} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => selectProgram()}>
            Select
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
