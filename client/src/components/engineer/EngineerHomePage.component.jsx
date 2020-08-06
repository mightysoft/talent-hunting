import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { getAllJobs } from '../../redux/actions/jobActions';
import Job from '../job/Job.component';

const EngineerHomePage = ({ auth, getAllJobs, jobs }) => {
  console.log('jobs ', jobs);
  useEffect(() => {
    getAllJobs();
  }, ['']);
  if (
    (auth.user && auth.user.role === 'recruiter') ||
    auth.isAuthenticated === false
  )
    return <Redirect to='/' />;

  return (
    <Fragment>
      <h2>Welcome to Engineer Page!</h2>
      <br />
      <h5>All Job Posts :</h5>
      <br />
      {jobs.jobs && jobs.jobs.map(job => <Job key={job._id} job={job} />)}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  jobs: state.job.jobs,
  auth: state.auth,
});

export default connect(mapStateToProps, { getAllJobs })(EngineerHomePage);
