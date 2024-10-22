import React, { useEffect } from 'react';
import AppNavbar from './components/AppNavbar.component';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'mdbreact/dist/css/mdb.css';

import { Switch, Route } from 'react-router-dom';


import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';

// import './App.css';

import Dashboard from './components/recruiter/Dashboard.component';
import LogInForm from './components/auth/LogInForm.component';
import RecruiterHomePage from './components/recruiter/RecruiterHomePage.component';
import CandidateHomePage from './components/candidate/CandidateHomePage.component';

import JobInfo from './components/candidate/JobInfo.component';

import JobExplicit from './components/recruiter/JobExplicit.component';

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
            <Route exact path='/candidate-homepage' component={CandidateHomePage} />
            <Route exact path='/recruiter-homepage' component={RecruiterHomePage} />
            <Route exact path='/recruiter-dashboard' component={Dashboard} />

            {/* only for recruiter */}
            <Route exact path='/job-explicit/:id/:title' component={JobExplicit} />
            {/* only for dev/eng */}
            <Route exact path='/job-info/:id/:title' component={JobInfo} />
          </Switch>
        </Container>
      </div>
    </Provider>
  );
};

export default App;
