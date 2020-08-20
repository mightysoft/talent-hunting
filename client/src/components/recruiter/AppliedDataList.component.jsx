import React from 'react';
import { MDBDataTable } from 'mdbreact';

const AppliedDataList = ({ appliedData }) => {
  let rowsData = [];

  // storing user daily works data in rows data
  appliedData.forEach(da =>
    rowsData.push({
      name: da.candidate.name,
      email: (
        <a
          className='text-info'
          target='_blank'
          rel='noopener noreferrer'
          href={`mailto:${da.candidate.email}`}
        >
          {da.candidate.email}
        </a>
      ),
      emailData: da.candidate.email,
      candidateSkills: da.candidateSkills.map(el => el + ', '),
      skillsPerc: da.skillsPerc.substr(0, 5) + '%',
      percNum: da.skillsPerc,
    })
  );

  const data = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 90,
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Skills',
        field: 'candidateSkills',
        sort: 'desc',
        width: 150,
      },
      {
        label: 'Skills Perc',
        field: 'skillsPerc',
        sort: 'asc',
        width: 150,
      },
    ],
    rows: rowsData,
  };

  return <MDBDataTable striped bordered hover small data={data} />;
};

export default AppliedDataList;
