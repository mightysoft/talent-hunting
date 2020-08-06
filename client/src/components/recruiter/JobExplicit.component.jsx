import React, { Fragment, useState, useEffect } from 'react';
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
  appliedData,
  job,
}) => {
  const { id } = useParams();
  const jobDetail = job.job;
  console.log('appliedData ', appliedData);
  useEffect(() => {
    getJobDetails(id);
    getAppliedData(id);
  }, ['']);

  if (auth.isAuthenticated === false) return <Redirect to='/' />;
  return (
    <Fragment>
      {' '}
      {jobDetail && <JobDetail jobDetail={jobDetail} />}
      <br />
      <h1>Applied Data</h1>
      {appliedData.data && appliedData.data.length > 0 && (
        <AppliedDataList appliedData={appliedData.data} />
      )}
      {appliedData.data && appliedData.data.length <= 0 && (
        <h4>No one applied yet!</h4>
      )}
      <a href=''></a>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  job: state.job.job,
  appliedData: state.job.appliedData,
  auth: state.auth,
  isLoading: state.job.isLoading,
});

export default connect(mapStateToProps, { getJobDetails, getAppliedData })(
  JobExplicit
);
