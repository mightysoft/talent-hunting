import React, { Fragment, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import RegisterModal from './auth/RegisterModal.component';
import LoginModal from './auth/LoginModal.component';
import Logout from './auth/Logout.component';
import { connect } from 'react-redux';

const AppNavbar = ({ auth }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const authLinks = (
    <Fragment>
      <NavItem>
        <span className='navbar-text mr-3'>
          <strong>{auth.user ? `Welcome ${auth.user.name}` : null}</strong>
        </span>
      </NavItem>
      <NavItem className='p-2'>
        {auth.user && auth.user.role === 'recruiter' ? (
          <Link className='option' to='/recruiter-homepage'>
            Home
          </Link>
        ) : (
          <Link to='/candidate-homepage'>Home</Link>
        )}
      </NavItem>

      {auth.user && auth.user.role === 'recruiter' && (
        <>
          <NavItem className='p-2'>
            <Link className='option' to='/recruiter-dashboard'>
              Dashboard
            </Link>
          </NavItem>
        </>
      )}

      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>

      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color='dark' dark expand='sm' className='mb-5'>
        <Container>
          <NavbarBrand href='/'>Talent Hunting</NavbarBrand>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {auth && auth.isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
