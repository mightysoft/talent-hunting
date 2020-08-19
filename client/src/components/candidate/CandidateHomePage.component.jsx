import React, { Fragment, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MDBCol, MDBFormInline } from 'mdbreact';
import { Row, Col, Dropdown } from 'react-bootstrap';

import { connect } from 'react-redux';
import { getAllJobs, searchJobs } from '../../redux/actions/jobActions';
import Job from '../job/Job.component';
// components
import JobDetail from '../job/JobDetail.component';
import JobInfo from './JobInfo.component';

const CandidateHomePage = ({ auth, getAllJobs, searchJobs, jobs }) => {
  const [text, setText] = useState('');
  const [jobDetails, setJobDetails] = useState('');

  useEffect(() => {
    getAllJobs();
  }, [text.length === 0]);

  useEffect(() => {
    if (text) {
      searchJobs(text);
    }
  }, [text]);
  if (
    (auth.user && auth.user.role === 'recruiter') ||
    auth.isAuthenticated === false
  )
    return <Redirect to='/' />;

  const handleTextChange = e => {
    e.preventDefault();
    console.log(e.target.value);
    setText(e.target.value);
    setJobDetails('');
    console.log('test : ', text);
  };

  // TODO: margin, padding
  return (
    <Fragment>
      <h2>Welcome to Candidate Page! 🎉</h2>
      <MDBCol lg='4' md='6' s='12' className='float-right'>
        <MDBFormInline className='md-form'>
          <i className='fa fa-search mr-2' aria-hidden='true'></i>
          <input
            className='form-control form-control-sm mr-2'
            type='text'
            placeholder='Search'
            aria-label='Search'
            onChange={handleTextChange}
          />
          <Dropdown>
            <Dropdown.Toggle variant='success' id='dropdown-basic'>
              <i className='fa fa-filter' aria-hidden='true'></i> Filter
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {['All', 'Part Time', 'Full Time'].map(el => (
                <Dropdown.Item
                  as='button'
                  key={el}
                  value={el === 'All' ? '' : el}
                  onClick={handleTextChange}
                >
                  {el}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </MDBFormInline>
      </MDBCol>

      <br />
      <br />
      <br />
      <Row>
        <Col
          lg='4'
          style={{
            maxHeight: '800px',
            overflowY: 'scroll',
          }}
        >
          {jobs.length > 0 &&
            jobs.map(job => (
              <Job key={job._id} job={job} setJobDetails={setJobDetails} />
            ))}
        </Col>

        {jobs.length > 0 && (
          <Col lg='8'>
            <JobDetail jobDetail={jobDetails ? jobDetails : jobs[0]} />
          </Col>
        )}
      </Row>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  jobs: state.job.jobs,
  auth: state.auth,
});

export default connect(mapStateToProps, { getAllJobs, searchJobs })(
  CandidateHomePage
);
