import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ClientChat from './ClientChat';

const ProfilePage = props => (
  <div>
    <h1>{props.snyppr.fname} {props.snyppr.lname}</h1>
    <p>{props.snyppr.address}</p>
    {/* Place Stripe Button Here*/}
    <button>Stripe</button>
    <ClientChat name={`${props.snyppr.fname}${props.snyppr.lname}`} />
  </div>
  )
;

ProfilePage.propTypes = {
  snyppr: PropTypes.shape.isRequired,
};

const mapStateToProps = state => ({
  snyppr: state.currentSnyppr,
});

export default connect(mapStateToProps)(ProfilePage);
