import React from 'react';
import PropTypes from 'prop-types';

const ProfilePage = props => (
  <div>
    <h1>{props.fname} {props.lname}</h1>
    <p>{props.address}</p>
    {/* Place Stripe Button Here*/}
  </div>
  )
;

ProfilePage.propTypes = {
  fname: PropTypes.string.isRequired,
  lname: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ProfilePage;

