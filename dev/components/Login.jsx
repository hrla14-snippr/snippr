import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, NavItem, Nav} from 'react-bootstrap'
import { Button, Dropdown } from 'semantic-ui-react'

const options = [
  { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
  { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
  { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
]

const Login = props =>
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
        <NavItem onClick={props.login} href="">Log In</NavItem>
      </Nav>
    </Navbar.Collapse>
    </Navbar>
    </div>
  );

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Login;
