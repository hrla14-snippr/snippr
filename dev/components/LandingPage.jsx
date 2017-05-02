import React from 'react';
import PropTypes from 'prop-types';

const LandingPage = () =>
  (
    <div className="landing-page">
      landing page
    </div>
  );


LandingPage.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default LandingPage;
