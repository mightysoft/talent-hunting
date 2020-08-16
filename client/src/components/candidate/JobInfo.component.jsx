import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, Card, Badge } from 'react-bootstrap';

import JobDetail from '../job/JobDetail.component';
import {
  getJobDetails,
  applyJob,
  getCandidateAppliedData,
} from '../../redux/actions/jobActions';
import Alert from '../alert/Alert.component';

const JobInfo = ({
  auth,
  getJobDetails,
  job,
  applyJob,
  getCandidateAppliedData,
  appliedData,
  isApplied,
  isLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');

  const jobDetail = job.job;
  const { id } = useParams();

  useEffect(() => {
    getJobDetails(id);
    if (auth.user) {
      getCandidateAppliedData(auth.user.email, id);
    }
  }, [auth, isApplied]);

  if (auth.isAuthenticated === false) return <Redirect to='/' />;
  const handleToggle = () => setIsOpen(!isOpen);

  const handleTextFieldChange = (mySetFunction, event) => {
    mySetFunction(event.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const body = {
      candidate: {
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
      {appliedData && appliedData.length > 0 && (
        <Card>
          {appliedData.map(el => (
            <div className='m-3' key={el._id}>
              <h4 className='text-dark'>
                Your Submitted Skills :{' '}
                {el.candidateSkills.map(skill => (
                  <Badge variant='light' className='mr-2' key={skill}>
                    <h6>{skill}</h6>
                  </Badge>
                ))}
              </h4>
              <h4>
                Skill Perc :{' '}
                <span className='text-success'>
                  {el.skillsPerc.substring(0, 5)}%
                </span>
              </h4>
            </div>
          ))}

          <p className='m-3'>
            Here is your applied data. Recruiter will contract you.{' '}
          </p>
        </Card>
      )}
      {!isApplied && (
        <Button variant='outline-success' title='Apply' onClick={handleToggle}>
          Apply!
        </Button>
      )}
      <br />
      {isOpen && (
        <Form id='input_form' onSubmit={handleSubmit}>
          <hr />
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
  appliedData: state.job.appliedData,
  isApplied: state.job.isApplied,
  auth: state.auth,
  isLoading: state.job.isLoading,
});

export default connect(mapStateToProps, {
  getJobDetails,
  applyJob,
  getCandidateAppliedData,
})(JobInfo);
