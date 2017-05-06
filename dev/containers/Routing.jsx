import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AuthService from '../utils/AuthService';
import ProfilePage from './ProfilePage';
import LandingPage from './LandingPage';
import UserInfoForm from '../components/UserInfoForm';
import BarberDashboard from '../containers/BarberDashboard';
import ClientDashboard from '../containers/ClientDashboard';


class Routing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new AuthService('enONSvCznucqb91b3s0guCDKxX5Ce6KO', 'kirisakima.auth0.com', props.history, 'prefill'),
      hasProfile: false,
      hasStripeId: false,
      profile: {},
    };
    this.confirmLoggedIn = this.confirmLoggedIn.bind(this);
    this.submitUserInfo = this.submitUserInfo.bind(this);
    this.renderDashboard = this.renderDashboard.bind(this);
    this.confirmHasProfile = this.confirmHasProfile.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
  }

  componentDidMount() {
    if (this.state.auth.loggedIn()) {
      this.checkUserExists();
    }
  }

  submitUserInfo(e) {
    e.preventDefault();

    const data = { styles: '' };
    data.id = this.state.auth.getAuthId();
    data.accountType = this.state.auth.getAccountType();
    Array.prototype.slice.call(e.target).forEach((childNode) => {
      if (childNode.name && childNode.type === 'text') {
        data[childNode.name] = childNode.value;
      }
      if (childNode.type === 'checkbox' && childNode.checked) {
        data.styles += childNode.value;
      }
    });
    console.log(data, 'this is how data looks before axios call');
    // setstate in axios callback
    axios.post('/addProfile', data)
      .then((res) => {
        console.log(res);
        const stateOptions = this.state.auth.getAccountType() === 'Snypee'
          ? { hasProfile: true, hasStripeId: true }
          : { hasProfile: true };
        this.setState(stateOptions, function () {
          this.props.history.push('/dashboard');
        });
      })
      .catch(err => console.log('error adding profile', err));
  }

  // checkUserHasStripe() {
  //   const context = this;

  //   return axios.get('/stripeId')
  //     .then(({ data }) => {
  //       if (data) {
  //         context.setState({
  //           stripeId: data.stripeId,
  //         });
  //       }
  //     })
  //     .catch(e => console.log('stripe error', e));
  // }

  checkUserExists() {
    const context = this;

    // TODO: setup stripeId check
    const accountType = this.state.auth.getAccountType();
    axios.post('/verifyProfile', {
      id: this.state.auth.getAuthId(),
      accountType,
    })
      .then(({ data }) => {
        console.log('verifyprofile res', data);
        if (data && (accountType === 'Snypee' || data.snypprstripe)) {
          context.setState({
            profile: data,
            hasProfile: true,
            hasStripeId: true,
          });
        }
      })
      .catch(e => console.log('error checkuserexist', e));
  }

  confirmLoggedIn() {
    return this.state.auth.loggedIn() ? this.renderDashboard() : <Redirect to="/" />;
  }

  confirmHasProfile() {
    if (this.state.auth.loggedIn()) {
      return this.state.hasProfile && this.state.hasStripeId
        ? <Redirect to="/dashboard" />
        : <UserInfoForm
          submitUserInfo={this.submitUserInfo}
          hasStripeId={this.state.hasStripeId}
          hasProfile={this.state.hasProfile}
          authId={this.state.auth.getAuthId()}
          accountType={this.state.auth.getAccountType()}
        />;
    }
    return <Redirect to="/" />;
  }

  renderDashboard() {
    // do call to db and check if authId exists
    if (this.state.hasProfile && this.state.hasStripeId) {
      const accountType = this.state.auth.getAccountType();
      return accountType === 'Snyppr'
        ? <BarberDashboard profile={this.state.profile} logout={this.state.auth.logout} />
        : <ClientDashboard profile={this.state.profile} logout={this.state.auth.logout} />;
    }
      // if not, send to /newUser
    return <Redirect to="/newUser" />;
  }

  renderProfile() {
    return this.state.auth.loggedIn() && this.state.hasProfile
      ? <ProfilePage logout={this.state.auth.logout} />
      : <Redirect to="/dashboard" />;
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
        <Route exact path="/snypprProfile" render={this.renderProfile} />
      </Switch>
    );
  }
}

Routing.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(Routing);
