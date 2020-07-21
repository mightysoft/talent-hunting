import React from 'react';
import { connect } from 'react-redux';

import LogInForm from './auth/LogInForm.component';

const ItemModel = ({ isAuthenticated }) => {
  return (
    <div>
      {isAuthenticated ? (
        <LogInForm />
      ) : (
        <h4 className='mb-3 ml-4'>Please log in to proccess....</h4>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(ItemModel);
