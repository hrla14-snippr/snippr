import React from 'react';
import PropTypes from 'prop-types';

const LandingPage = props =>
  (
    <div>
      landing page
      <button onClick={props.logout}>Logout</button>
    </div>
  );


LandingPage.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default LandingPage;
