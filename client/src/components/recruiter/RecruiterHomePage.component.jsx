import React, { Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function RecruiterHomePage() {
  return (
    <Fragment>
      <h2>Welcome to Recruiter Page!</h2>
      <br />
      <h3>Post a job here!</h3>
      <br />

      <Form>
        <FormGroup>
          <Label for='Company'>Company</Label>
          <Input
            type='text'
            name='Company'
            id='Company'
            className='mb-3'
            placeholder='Company Name'
            required
          />

          <Label for='Companyurl'>Company URL</Label>
          <Input
            type='text'
            name='Companyurl'
            id='Companyurl'
            className='mb-3'
            placeholder='Company URL'
            required
          />

          <Label for='location'>Location</Label>
          <Input
            type='text'
            name='location'
            id='location'
            className='mb-3'
            placeholder='Location'
            required
          />

          <Label for='title'>Title</Label>
          <Input
            type='text'
            name='title'
            id='title'
            className='mb-3'
            placeholder='Job Title'
            required
          />

          <Label for='type'>Type</Label>
          <Input
            type='type'
            name='type'
            id='type'
            className='mb-3'
            placeholder='Job Type'
            required
          />

          <Label for='description'>description</Label>
          <Input
            type='text'
            name='description'
            id='description'
            className='mb-3'
            placeholder='Job description'
            required
          />

          <Label for='key_skills'>Key skills</Label>
          <Input
            type='text'
            name='key_skills'
            id='key_skills'
            className='mb-3'
            placeholder='java, python..'
            required
          />

          <Button color='dark' style={{ marginTop: '2rem' }} block>
            Save
          </Button>
        </FormGroup>
      </Form>
    </Fragment>
  );
}

export default RecruiterHomePage;
