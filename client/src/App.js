import React, { useEffect } from 'react';
import AppNavbar from './components/AppNavbar.component';
import { Container } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Dashboard from './components/recruiter/Dashboard.component';
import LogInForm from './components/auth/LogInForm.component';

// TODO: token not found on reload (error)

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className='App'>
        <AppNavbar />
        <Container>
          <Switch>
            <Route exact path='/' component={LogInForm} />
            <Route exact path='/recruiter-dashboard' component={Dashboard} />
          </Switch>
        </Container>
      </div>
    </Provider>
  );
};

export default App;
