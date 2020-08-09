import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { MDBCol, MDBFormInline, MDBIcon } from 'mdbreact';

import { connect } from 'react-redux';
import { getAllJobs, searchJobs } from '../../redux/actions/jobActions';
import Job from '../job/Job.component';

const EngineerHomePage = ({ auth, getAllJobs, searchJobs, jobs }) => {
  const [text, setText] = useState('');
  console.log('jobs ', jobs);

  useEffect(() => {
    console.log('1 called 😀');
    getAllJobs();
  }, [text.length === 0]);

  useEffect(() => {
    if (text) {
      console.log('2 called 🚀');
      searchJobs(text);
    }
  }, [text]);
  if (
    (auth.user && auth.user.role === 'recruiter') ||
    auth.isAuthenticated === false
  )
    return <Redirect to='/' />;

  const handleTextChange = e => setText(e.target.value);
  // TODO: margin, padding
  return (
    <Fragment>
      <h2>Welcome to Engineer Page!</h2>
      <h5>All Job Posts :</h5>
      <MDBCol md='4' className='float-right'>
        <MDBFormInline className='md-form'>
          <MDBIcon icon='search' />
          <input
            className='form-control form-control-sm ml-3 w-75'
            type='text'
            placeholder='Search'
            aria-label='Search'
            onChange={handleTextChange}
          />
        </MDBFormInline>
      </MDBCol>
      <br />
      <br />
      <br />
      <br />

      {jobs.jobs && jobs.jobs.map(job => <Job key={job._id} job={job} />)}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  jobs: state.job.jobs,
  auth: state.auth,
});

export default connect(mapStateToProps, { getAllJobs, searchJobs })(
  EngineerHomePage
);
