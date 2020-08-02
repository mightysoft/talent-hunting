import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Badge, Button, Collapse, Form } from 'react-bootstrap';
import dayjs from 'dayjs';

import { getJobDetails } from '../../redux/actions/jobActions';

const JobDetail = ({ getJobDetails, job, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const jobDetail = job.job;
  const { id } = useParams();
  useEffect(() => {
    getJobDetails(id);
  }, ['']);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div>
      {jobDetail && (
        <Card className='mb-3' key={jobDetail._id}>
          <Card.Body>
            <div className='d-flex justify-content-between'>
              <div>
                <Card.Title>{jobDetail.title}</Card.Title>
                <Card.Subtitle className='text-muted mb-2'>
                  {dayjs(jobDetail.createdAt).format('h:mm A, MMMM DD, YYYY')}
                </Card.Subtitle>
                <Badge variant='secondary' className='mr-2'>
                  {jobDetail.type}
                </Badge>
                <Badge variant='secondary'>{jobDetail.location}</Badge>
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
              <Badge variant='info' className='mr-2' key={skill}>
                <h6>{skill}</h6>
              </Badge>
            ))}
          </Card.Body>
        </Card>
      )}

      <br />
      <Button variant='outline-success' title='Apply' onClick={handleToggle}>
        Apply!
      </Button>

      {isOpen && (
        <Form>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Please Enter Your skills here : </Form.Label>
            <Form.Control type='text' placeholder='html, css...' />
            <Form.Text className='text-danger'>
              Please separate your skills by ',' (comma)
            </Form.Text>
          </Form.Group>
          <Button variant='outline-info' title='Save' onClick={handleToggle}>
            Save
          </Button>
        </Form>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  job: state.job.job,
  isLoading: state.job.isLoading,
});

export default connect(mapStateToProps, { getJobDetails })(JobDetail);
