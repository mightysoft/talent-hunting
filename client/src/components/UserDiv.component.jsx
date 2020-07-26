import React from 'react';
import { connect } from 'react-redux';

import LogInForm from './auth/LogInForm.component';

const UserDiv = ({ isAuthenticated }) => {
  return <div>{!isAuthenticated ? <LogInForm /> : null}</div>;
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(UserDiv);
