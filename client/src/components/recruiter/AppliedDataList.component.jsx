import React from 'react';
import { MDBDataTable } from 'mdbreact';

const AppliedDataList = ({ appliedData }) => {
  let rowsData = [];

  // storing user daily works data in rows data
  appliedData.forEach(da =>
    rowsData.push({
      name: da.user.name,
      email: (
        <a
          className='text-info'
          target='_blank'
          rel='noopener noreferrer'
          href={`mailto:${da.user.email}`}
        >
          {da.user.email}
        </a>
      ),
      userSkills: da.userSkills.map(el => el + ', '),
      skillsPerc: da.skillsPerc + '%',
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
        field: 'userSkills',
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
