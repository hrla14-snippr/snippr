import React, { Component } from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AuthService from '../utils/AuthService';
import LandingPage from './LandingPage';
import UserInfoForm from './UserInfoForm';
import Login from './Login';
import ClientDashboard from '../containers/ClientDashboard';

class Routing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new AuthService('enONSvCznucqb91b3s0guCDKxX5Ce6KO', 'kirisakima.auth0.com', props.history),
      hasProfile: false,
    };
    this.renderHomepage = this.renderHomepage.bind(this);
    this.submitUserInfo = this.submitUserInfo.bind(this);
  }

  submitUserInfo(e) {
    e.preventDefault();
    const data = {};
    Array.prototype.slice.call(e.target.children).forEach((childNode, idx, arr) => {
      if (idx < 3) {
        data[childNode.name] = childNode.value;
      } else if (idx < arr.length - 1) {
        data[childNode.children[0].name] = childNode.children[0].checked;
      }
    });
    console.log(data);
    // setstate in axios callback
    this.setState({ hasProfile: true });
    this.props.history.push('/');
  }

  renderUserInfoForm() {
    return this.state.hasProfile
      ? <LandingPage logout={this.state.auth.logout} />
      : <Redirect to="/newUser" />;
  }

  renderHomepage() {
    return this.state.auth.loggedIn() ? this.renderUserInfoForm() : <Redirect to="/login" />;
  }

  render() {
    const { history } = this.props; // eslint-disable-line no-unused-vars

    return (
      <Switch>
        <Route exact path="/" render={this.renderHomepage} />
        <Route exact path="/login">
          <Login login={this.state.auth.login} />
        </Route>
        <Route exact path="/cdashboard">
          <ClientDashboard />
        </Route>
        <Route exact path="/newUser">
          <UserInfoForm submitUserInfo={this.submitUserInfo} />
        </Route>
      </Switch>
    );
  }
}

Routing.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(Routing);
