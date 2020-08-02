import React, { Fragment, useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

import { jobPost } from '../../redux/actions/jobActions';

const RecruiterHomePage = ({ auth, jobPost, jobs }) => {
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Full Time');
  const [des, setDes] = useState('');

  // console.log('re jobs', jobs);
  const handleSetCompanyName = e => setCompanyName(e.target.value);
  const handleSetLocation = e => setLocation(e.target.value);
  const handleSetSkills = e => setSkills(e.target.value);
  const handleSetTitle = e => setTitle(e.target.value);
  const handleSetType = e => setType(e.target.value);
  const handleSetDes = e => setDes(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    const body = {
      rec_id: auth.user._id,
      type,
      company: companyName,
      location,
      title,
      description: des,
      skills,
    };

    jobPost(body);
  };

  return (
    <Fragment>
      <h2>Welcome to Recruiter Page!</h2>
      <br />
      <h3>Post a job here!</h3>
      <br />

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for='Company'>Company</Label>
          <Input
            type='text'
            name='Company'
            id='Company'
            className='mb-3'
            placeholder='Company Name'
            onChange={handleSetCompanyName}
            required
          />

          <Label for='location'>Location</Label>
          <Input
            type='text'
            name='location'
            id='location'
            className='mb-3'
            placeholder='City or Country name'
            onChange={handleSetLocation}
            required
          />

          <Label for='title'>Title</Label>
          <Input
            type='text'
            name='title'
            id='title'
            className='mb-3'
            placeholder='Job Title'
            onChange={handleSetTitle}
            required
          />

          <Label for='type'>Type</Label>
          <Input
            type='select'
            name='type'
            id='type'
            className='mb-3'
            required
            onChange={handleSetType}
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
            onChange={handleSetDes}
            required
          />

          <Label for='key_skills'>Key skills</Label>
          <Input
            type='text'
            name='key_skills'
            id='key_skills'
            className='mb-3'
            placeholder='java, python..'
            onChange={handleSetSkills}
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
