import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Dashboard = ({ isAuthenticated }) => {
  if (!isAuthenticated) return <Redirect to='/' />;

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-mx-12 col-md-12 col-sm-12'>
          <strong>Posted Jobs</strong>
          <hr />
        </div>
      </div>

      <div className='row'>
        <div className='col-mx-12 col-md-12 col-sm-12'>
          <strong>Applied Candidate</strong> <hr />
          <div className='col'>Candidate Number / Lists</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(Dashboard);
