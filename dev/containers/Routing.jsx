import React, { Component } from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AuthService from '../utils/AuthService';
import LandingPage from './LandingPage';
import UserInfoForm from '../components/UserInfoForm';
import BarberDashboard from '../containers/BarberDashboard';
import ClientDashboard from '../containers/ClientDashboard';

class Routing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new AuthService('enONSvCznucqb91b3s0guCDKxX5Ce6KO', 'kirisakima.auth0.com', props.history, 'cb for prefill'),
      hasProfile: false,
    };
    this.confirmLoggedIn = this.confirmLoggedIn.bind(this);
    this.submitUserInfo = this.submitUserInfo.bind(this);
    this.renderDashboard = this.renderDashboard.bind(this);
    this.confirmHasProfile = this.confirmHasProfile.bind(this);
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
    this.props.history.push('/dashboard');
  }


  confirmLoggedIn() {
    return this.state.auth.loggedIn() ? this.renderDashboard() : <Redirect to="/" />;
  }

  confirmHasProfile() {
    if (this.state.auth.loggedIn()) {
      return this.state.hasProfile
        ? <Redirect to="/dashboard" />
        : <UserInfoForm submitUserInfo={this.submitUserInfo} />;
    }
    return <Redirect to="/" />;
  }

  renderDashboard() {
    if (this.state.hasProfile) {
      const accountType = this.state.auth.getAccountType();
      return accountType === 'snyppr'
        ? <BarberDashboard />
        : <ClientDashboard />;
    }
    return <Redirect to="/newUser" />;
  }

  render() {
    const { history } = this.props; // eslint-disable-line no-unused-vars

    return (
      <Switch>
        <Route exact path="/">
          <LandingPage logout={this.state.auth.logout} />
        </Route>
        <Route exact path="/dashboard" render={this.confirmLoggedIn} />
        <Route exact path="/newUser" render={this.confirmHasProfile} />
      </Switch>
    );
  }
}

Routing.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(Routing);
