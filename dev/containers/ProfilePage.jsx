import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ClientChat from './ClientChat';

const ProfilePage = props => (
  <div className="profile">

    <div className="clientheader">
      <h1 className="clientheadline">Snyppr</h1>
    </div>

    {/* Main Body*/}
    <div className="profile-box">


      <h1>{props.snyppr.fname} {props.snyppr.lname}</h1>
      <p>{props.snyppr.address}</p>
      <button>Stripe</button>
      <ClientChat name={`${props.snyppr.fname}${props.snyppr.lname}`} />

    </div>


    <div className="clientfooter" >
      <span className="footerdet">Refer Friends</span>
      <span className="footerdet">About Us</span>
      <span className="footerdet">Become Snyppr</span>
    </div>

  </div>

  );

ProfilePage.propTypes = {
  snyppr: PropTypes.shape.isRequired,
};

const mapStateToProps = state => ({
  snyppr: state.currentSnyppr,
});

export default connect(mapStateToProps)(ProfilePage);
