import React, { Fragment, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Button, Form } from 'react-bootstrap';
import AppliedDataList from './AppliedDataList.component';

import { getJobDetails, getAppliedData } from '../../redux/actions/jobActions';
import JobDetail from '../job/JobDetail.component';
const JobExplicit = ({
  auth,
  getJobDetails,
  getAppliedData,
  allAppliedData,
  job,
}) => {
  const { id } = useParams();
  const jobDetail = job.job;
  useEffect(() => {
    getJobDetails(id);
    getAppliedData(id);
  }, ['']);

  if (auth.isAuthenticated === false) return <Redirect to='/' />;
  return (
    <Fragment>
      {jobDetail && <JobDetail jobDetail={jobDetail} />}
      <br />
      <h1>Applied Data</h1>
      {allAppliedData.data && allAppliedData.data.length > 0 && (
        <AppliedDataList appliedData={allAppliedData.data} />
      )}
      {allAppliedData.data && allAppliedData.data.length <= 0 && (
        <h4>No one applied yet!</h4>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  job: state.job.job,
  allAppliedData: state.job.allAppliedData,
  auth: state.auth,
  isLoading: state.job.isLoading,
});

export default connect(mapStateToProps, { getJobDetails, getAppliedData })(
  JobExplicit
);
