import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LandingPage = () =>
  (
    <div className="landing-page">
      <button className="snypee-but">Click here to be a snypee</button>
      <button className="snyppr-but">Click here to be a snyppr</button>
      <Link to="/login"><button className="login">Login</button></Link>
      <div className="logo">Snyppr</div>
      <div className="left-overlay" >
        <div className="left-text">Are you a Snypee?</div>
      </div>
      <div className="right-overlay" >
        <div className="right-text">Are you a Snyppr?</div>
      </div>
    </div>
  );


LandingPage.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default LandingPage;
