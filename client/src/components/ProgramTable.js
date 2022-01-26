import React, { useState } from 'react';
import { Button, Container, Modal, Table } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';

import ProgramDetail from './ProgramDetail';
import { createUserProgram, retrieveProgram } from '../services/Api';
import { accessTokenState, userState } from '../state/Auth';
import { programsState } from '../state/Core';

export default function ProgramTable() {
  const [program, setProgram] = useState(null);
  const [show, setShow] = useState(false);

  const accessToken = useRecoilValue(accessTokenState);
  const programs = useRecoilValue(programsState);
  const user = useRecoilValue(userState);

  const programDetail = async (programId) => {
    const { data, isError } = await retrieveProgram(accessToken, programId);
    if (!isError) {
      setProgram(data);
      setShow(true);
    }
  };

  const selectProgram = async () => {
    await createUserProgram(accessToken, user.id, program.id);
  };

  const tableBody =
    programs.length === 0 ? (
      <tr>
        <td colSpan="3">No programs.</td>
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
          <Container>
            <ProgramDetail program={program} />
          </Container>
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
