import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AuthService from '../utils/AuthService';
import LandingPage from './LandingPage';
import Login from './Login';

class Routing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new AuthService('enONSvCznucqb91b3s0guCDKxX5Ce6KO', 'kirisakima.auth0.com', props.history),
    };
    this.renderHomepage = this.renderHomepage.bind(this);
  }

  renderHomepage() {
    console.log('logged in?', this.state.auth.loggedIn());
    return this.state.auth.loggedIn() ? <LandingPage logout={this.state.auth.logout} /> : <Redirect to={'/login'} />;
  }

  render() {
    const { history } = this.props; // eslint-disable-line no-unused-vars

    return (
      <Switch>
        <Route exact path="/" render={this.renderHomepage} />
        <Route exact path="/login">
          <Login login={this.state.auth.login} />
        </Route>
      </Switch>
    );
  }
}

Routing.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(Routing);
