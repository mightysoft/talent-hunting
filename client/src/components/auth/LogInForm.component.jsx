import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';
import RecruiterHomePage from '../recruiter/RecruiterHomePage.component';
import CandidateHomePage from '../candidate/CandidateHomePage.component';

const LogInForm = ({ auth }) => {
  if (auth.user && auth.user.role === 'recruiter') {
    return <RecruiterHomePage />;
  }

  if (auth.user && auth.user.role === 'candidate') {
    return <CandidateHomePage />;
  }

  return (
    <Fragment>
      {auth.isAuthenticated === false && (
        <h4 className='mb-3 ml-4'>
          Welcome to Talent Hunting! <br /> Please log in to process....
        </h4>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { login, clearErrors })(LogInForm);
