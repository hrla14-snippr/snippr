import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, NavItem, Nav} from 'react-bootstrap'
const LandingPage = props =>
  (
    <div>
      <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Snyppr</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem onClick={props.logout} href="">Logout</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>


      landing
    </div>
  );


LandingPage.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default LandingPage;
