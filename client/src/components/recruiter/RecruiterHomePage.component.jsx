import React, { Fragment, useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { jobPost } from '../../redux/actions/jobActions';
import Alert from '../alert/Alert.component';

const RecruiterHomePage = ({ auth, jobPost }) => {
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Full Time');
  const [des, setDes] = useState('');

  if (
    (auth.user && auth.user.role === 'candidate') ||
    auth.isAuthenticated === false
  )
    return <Redirect to='/' />;

  const handleTextFieldChange = (mySetFunction, event) => {
    mySetFunction(event.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const body = {
      recId: auth.user._id,
      type,
      company: companyName,
      location,
      title,
      description: des,
      skills,
    };

    jobPost(body);
    // console.log('body ', body);

    Alert('success', 'Job Posted Successfully!');
    document.getElementById('input_form').reset();
  };

  return (
    <Fragment>
      <h2>Welcome to Recruiter Page!</h2>
      <br />
      <h3>Post a job here!</h3>
      <br />

      <Form onSubmit={handleSubmit} id='input_form'>
        <FormGroup>
          <Label for='Company'>Company</Label>
          <Input
            type='text'
            name='Company'
            id='Company'
            className='mb-3'
            placeholder='Company Name'
            onChange={e => handleTextFieldChange(setCompanyName, e)} // {handleSetCompanyName}
            required
          />

          <Label for='location'>Location</Label>
          <Input
            type='text'
            name='location'
            id='location'
            className='mb-3'
            placeholder='City or Country name'
            onChange={e => handleTextFieldChange(setLocation, e)} // {handleSetLocation}
            required
          />

          <Label for='title'>Title</Label>
          <Input
            type='text'
            name='title'
            id='title'
            className='mb-3'
            placeholder='Job Title'
            onChange={e => handleTextFieldChange(setTitle, e)} // {handleSetTitle}
            required
          />

          <Label for='type'>Type</Label>
          <Input
            type='select'
            name='type'
            id='type'
            className='mb-3'
            required
            onChange={e => handleTextFieldChange(setType, e)} // {handleSetType}
          >
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Part Time/Full Time</option>
            <option>Full Time/Part Time</option>
          </Input>

          <Label for='description'>description</Label>
          <Input
            type='text'
            name='description'
            id='description'
            className='mb-3'
            placeholder='Job description'
            onChange={e => handleTextFieldChange(setDes, e)} // {handleSetDes}
            required
          />

          <Label for='key_skills'>Key skills</Label>
          <Input
            type='text'
            name='key_skills'
            id='key_skills'
            className='mb-3'
            placeholder='java, python..'
            onChange={e => handleTextFieldChange(setSkills, e)} // {handleSetSkills}
            required
          />

          <Button color='dark' style={{ marginTop: '2rem' }} block>
            Save
          </Button>
        </FormGroup>
      </Form>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  jobs: state.job.jobs,
});

export default connect(mapStateToProps, { jobPost })(RecruiterHomePage);

// TODO: Company url will be added
