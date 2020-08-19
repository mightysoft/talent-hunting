import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import dayjs from 'dayjs';
import { Col, Card, Badge, Collapse } from 'react-bootstrap';

const JobDetail = ({ auth, jobDetail }) => {
  return (
    <Card className='' key={jobDetail._id}>
      <Card.Body>
        <div className='d-flex justify-content-between'>
          <div>
            <Card.Title>{jobDetail.title}</Card.Title>
            <Card.Subtitle className='text-muted mb-2'>
              {dayjs(jobDetail.createdAt).format('h:mm A, MMMM DD, YYYY')}
            </Card.Subtitle>
            <Badge variant='info' className='mr-2'>
              {jobDetail.type}
            </Badge>
            <Badge variant='light'>{jobDetail.location}</Badge>
          </div>
        </div>

        <Collapse in={true}>
          <div className='mt-4'>
            <p>Job Description</p>
            <p>{jobDetail.type}</p>
            <p>{jobDetail.location}</p>
            <p>{jobDetail.company}</p>
            <p>{jobDetail.description}</p>
          </div>
        </Collapse>

        {/* {job.skills} */}
        {jobDetail.skills.split(',').map(skill => (
          <Badge variant='secondary' className='mr-2' key={skill}>
            <h6>{skill}</h6>
          </Badge>
        ))}
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(JobDetail);
