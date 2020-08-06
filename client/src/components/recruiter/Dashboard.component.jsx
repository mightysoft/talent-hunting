import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Job from '../job/Job.component';
import { getRecPostedJobs } from '../../redux/actions/jobActions';

const Dashboard = ({
  isAuthenticated,
  user,
  getRecPostedJobs,
  recPostJobs,
}) => {
  console.log('user ', user);
  console.log('recPostJobs ', recPostJobs);
  useEffect(() => {
    if (user) {
      console.log('here');
      getRecPostedJobs(user._id);
    }
  }, [user]);

  if ((user && user.role === 'engineer') || isAuthenticated === false)
    return <Redirect to='/' />;

  return (
    <Fragment>
      <h4>Posted Jobs</h4>
      <Row>
        {recPostJobs &&
          recPostJobs.map(job => (
            <Col lg='4' md='6' sm='12' key={job._id}>
              <Job job={job} />
            </Col>
          ))}
        <hr />
      </Row>

      {/* <div className='row'>
        <div className='col-mx-12 col-md-12 col-sm-12'>
          <strong>Applied Candidate</strong> <hr />
          <div className='col'>Candidate Number / Lists</div>
        </div>
      </div> */}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  recPostJobs: state.job.recPostJobs,
});

export default connect(mapStateToProps, { getRecPostedJobs })(Dashboard);
