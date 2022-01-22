import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';

import ProgramDetail from './ProgramDetail';
import { accessTokenState, userProgramState, userState } from '../state/Auth';
import { programListQuery } from '../state/Core';
import { createUserProgram, retrieveProgram } from '../services/Api';

export default function Program() {
  // const userProgress = useRecoilValue(userProgressQuery);

  return (
    <React.Suspense fallback={<>Loading...</>}>
      <ProgramTable />
    </React.Suspense>
  );
}

function ProgramTable() {
  const [program, setProgram] = useState(null);
  const [show, setShow] = useState(false);
  const [userProgram, setUserProgram] = useRecoilState(userProgramState);
  const accessToken = useRecoilValue(accessTokenState);
  const user = useRecoilValue(userState);
  const programList = useRecoilValue(programListQuery);

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
      setUserProgram(data);
    }
  };

  const tableBody =
    programList.length === 0 ? (
      <tr>
        <td colspan="3">No programs.</td>
      </tr>
    ) : (
      programList.map((program) => (
        <tr key={program.id} onClick={() => programDetail(program.id)}>
          <td>{program.name}</td>
          <td>{program.duration_in_days}</td>
          <td>{program.total_workouts}</td>
        </tr>
      ))
    );

  return (
    <>
      <Table bordered striped>
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

// function ProgramModal() {
//   const programDetail = () => {

//   };

//   return (

//   );
// }
