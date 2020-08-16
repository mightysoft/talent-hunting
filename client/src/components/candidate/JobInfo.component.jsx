import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';

import JobDetail from '../job/JobDetail.component';
import { getJobDetails, applyJob } from '../../redux/actions/jobActions';
import Alert from '../alert/Alert.component';

const JobInfo = ({ auth, getJobDetails, job, applyJob, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');

  const jobDetail = job.job;
  const { id } = useParams();

  useEffect(() => {
    getJobDetails(id);
  }, ['']);

  if (auth.isAuthenticated === false) return <Redirect to='/' />;
  const handleToggle = () => setIsOpen(!isOpen);

  const handleTextFieldChange = (mySetFunction, event) => {
    mySetFunction(event.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const body = {
      user: {
        name: auth.user.name,
        email: auth.user.email,
      },
      jobId: id,
      // education,
      skills,
    };

    applyJob(body);

    Alert('success', 'Application submitted successfully!');
    document.getElementById('input_form').reset();
    setIsOpen(false);
  };

  return (
    <div>
      {jobDetail && <JobDetail jobDetail={jobDetail} />}
      <br />
      <Button variant='outline-success' title='Apply' onClick={handleToggle}>
        Apply!
      </Button>{' '}
      <br /> <hr />
      {isOpen && (
        <Form id='input_form' onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Education : </Form.Label>{' '}
            {['BSC', 'MSC', 'PHD', 'OTHERS'].map(el => (
              <Form.Check
                key={el}
                type='radio'
                label={el}
                inline
                name='education'
                id={el}
                value={el}
                onChange={e => handleTextFieldChange(setEducation, e)}
              />
            ))}
          </Form.Group>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Please Enter Your skills here : </Form.Label>
            <Form.Control
              type='text'
              placeholder='html, css...'
              onChange={e => handleTextFieldChange(setSkills, e)}
              required
            />
            <Form.Text className='text-danger'>
              Please separate your skills by ',' (comma)
            </Form.Text>
          </Form.Group>
          <Button variant='outline-info' type='submit' title='Save'>
            Save
          </Button>
        </Form>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  job: state.job.job,
  auth: state.auth,
  isLoading: state.job.isLoading,
});

export default connect(mapStateToProps, { getJobDetails, applyJob })(JobInfo);
