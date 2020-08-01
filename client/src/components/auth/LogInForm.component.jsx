import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import RecruiterHomePage from '../recruiter/RecruiterHomePage.component';
import EngineerHomePage from '../engineer/EngineerHomePage.component';

const UserDiv = ({ user }) => (
  <div>
    {user.role === 'engineer' ? <EngineerHomePage /> : <RecruiterHomePage />}
  </div>
);

function LogInForm({ auth }) {
  console.log('auth : ', auth.isAuthenticated);
  if (auth && auth.user && auth.user.role === 'recruiter') {
    return <RecruiterHomePage />;
  }

  if (auth && auth.user && auth.user.role === 'engineer') {
    return <EngineerHomePage />;
  }

  return (
    <Fragment>
      {auth && auth.user && <UserDiv user={auth.user} />}

      {auth.isAuthenticated === false && (
        <h4 className='mb-3 ml-4'>Please log in to manage....</h4>
      )}
    </Fragment>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { login, clearErrors })(LogInForm);
