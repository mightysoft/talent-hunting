import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Badge,
  Button,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
// import dayjs from 'dayjs';

const Job = ({ job, user, setJobDetails }) => {
  const history = useHistory();

  const handleClicked = job => {
    setJobDetails(job);
  };
  return (
    <Card
      className='mb-3'
      title={job.title}
      onClick={() => (user.role === 'candidate' ? setJobDetails(job) : null)}
    >
      <CardBody>
        <div className='d-flex justify-content-between'>
          <div>
            <CardTitle>
              <a
                className='tex-info'
                onClick={() =>
                  user.role === 'candidate'
                    ? history.push(`/job-info/${job._id}/${job.title}`)
                    : history.push(`/job-explicit/${job._id}/${job.title}`)
                }
                // onClick={() => setJobDetails(job)}
              >
                {job.title}
              </a>
            </CardTitle>
            <CardSubtitle className='text-muted mb-2'>
              {/* {dayjs(job.createdAt).format('h:mm A, MMMM DD, YYYY')} <br /> */}
              <svg
                aria-hidden='true'
                className='svg-icon iconClock'
                width='18'
                height='18'
                viewBox='0 0 18 18'
              >
                <path d='M9 17A8 8 0 119 1a8 8 0 010 16zm0-2A6 6 0 109 3a6 6 0 000 12zM8 5h1.01L9 9.36l3.22 2.1-.6.93L8 10V5z'></path>
              </svg>{' '}
              <Moment style={{ color: '#ff901e' }} fromNow>
                {job.createdAt}
              </Moment>
            </CardSubtitle>
            <Badge color='dark' className='mr-2'>
              {job.company}
            </Badge>
            <Badge color='info' className='mr-2'>
              {job.type}
            </Badge>
            <Badge color='secondary'>{job.location}</Badge>
          </div>
        </div>
        <CardText>
          {job.skills.split(',').map(skill => (
            <Badge
              style={{ backgroundColor: '#9cc3db', fontSize: '15px' }}
              className='mt-1 mr-1'
              key={skill}
            >
              {skill}
            </Badge>
          ))}
        </CardText>
      </CardBody>
    </Card>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(Job);
