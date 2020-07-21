import React, { useEffect } from 'react';
import AppNavbar from './components/AppNavbar.component';
import UserDiv from './components/UserDiv.component';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div className='App'>
        <AppNavbar />
        <Container>
          <UserDiv />
        </Container>
      </div>
    </Provider>
  );
};

export default App;
