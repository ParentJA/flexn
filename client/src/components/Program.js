import React from 'react';
import axios from 'axios';
import {
  // Modal,
  Table,
} from 'react-bootstrap';
import { useRecoilValue } from 'recoil';

import { accessTokenState } from '../state/Auth';

import {
  programListQuery,
  // userProgressQuery
} from '../state/Core';

export default function Program() {
  // const userProgress = useRecoilValue(userProgressQuery);

  return (
    <React.Suspense fallback={<>Loading...</>}>
      <ProgramTable />
    </React.Suspense>
  );
}

function ProgramTable() {
  const accessToken = useRecoilValue(accessTokenState);
  const programList = useRecoilValue(programListQuery);

  const programDetail = async (programId) => {
    try {
      const url = `/api/program/${programId}/`;
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      return null;
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
  );
}

// function ProgramModal() {
//   const programDetail = () => {

//   };

//   return (

//   );
// }
