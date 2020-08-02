import React, { Fragment, useEffect } from 'react';
import { Card, Badge, Button } from 'react-bootstrap'; // reactstrap
import dayjs from 'dayjs';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllJobs } from '../../redux/actions/jobActions';

const EngineerHomePage = ({ getAllJobs, jobs }) => {
  const history = useHistory();

  console.log('jobs ', jobs);
  if (jobs.jobs) {
    jobs.jobs.map(job => console.log(job._id));
    // console.log('josss', jobs.jobs);
  }
  useEffect(() => {
    getAllJobs();
  }, ['']);

  return (
    <Fragment>
      <h2>Welcome to Engineer Page!</h2>
      <br />
      <h5>All Job Posts :</h5>
      <br />
      {jobs.jobs &&
        jobs.jobs.map(job => (
          <Card className='mb-3' key={job._id}>
            <Card.Body>
              <div className='d-flex justify-content-between'>
                <div>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className='text-muted mb-2'>
                    {dayjs(job.createdAt).format('h:mm A, MMMM DD, YYYY')}
                  </Card.Subtitle>
                  <Badge variant='secondary' className='mr-2'>
                    {job.type}
                  </Badge>
                  <Badge variant='secondary'>{job.location}</Badge>
                </div>
              </div>
              <Card.Text>
                <br />
                <Button
                  onClick={() => history.push(`/job/${job._id}`)}
                  variant='primary'
                >
                  View Details
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  jobs: state.job.jobs,
});

export default connect(mapStateToProps, { getAllJobs })(EngineerHomePage);
