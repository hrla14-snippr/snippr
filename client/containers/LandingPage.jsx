import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AuthService from '../utils/AuthService';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountType: '',
      auth: new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN,
        props.history, props.accountType),
    };

    this.typedSignup = this.typedSignup.bind(this);
  }

  typedSignup(e) {
    this.setState({
      auth: new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN,
        this.props.history, e.target.value),
    }, () => this.state.auth.signup());
  }

  render() {
    const { history } = this.props; // eslint-disable-line no-unused-vars

    const SNYPEE = 'Snypee';
    const SNYPPR = 'Snyppr';
    return (
      <div className="wholepage">
        <div className="takeupspace">
          <div className="landing-page">
            <button onClick={this.typedSignup} value={SNYPEE} className="snypee-but">
              Click here to be a snypee
            </button>
            <button onClick={this.typedSignup} value={SNYPPR} className="snyppr-but">
              Click here to be a snyppr
            </button>
            <button onClick={this.state.auth.login} className="login">Login</button>
            <div className="logo">Snyppr</div>
            <div className="left-overlay" >
              <div className="text-center left-text">Are you a Snypee?</div>
            </div>
            <div className="right-overlay" >
              <div className="text-center right-text">Are you a Snyppr?</div>
            </div>
          </div>
        </div>
        <div className="about-us">
          <h1 className="text-center">ABOUT US!!</h1>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  accountType: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(LandingPage);

