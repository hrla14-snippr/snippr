import React from 'react';
import PropTypes from 'prop-types';

const StripeSignUp = props => (
  <div className="stripesignup">
<<<<<<< HEAD
    <div className="stripesignheader"><h1>Sign up for a Stripe Account</h1></div>
    <div className="stripesigncontent">
      <p>You will need a Stripe Account to continue using our service.</p>
      <button className="stripeacctbtn">
        <a href={props.stripeURL}>Click on the link to sign up for an account!</a>
      </button>
    </div>
=======
    <div className="formheader">Sign up for a Stripe Account</div>
    <p>You will need a Stripe Account to continue using our service.
          <a href={props.stripeURL}> Click on the link</a> to sign up for an account!</p>
>>>>>>> Create StripeSignUp component
  </div>);

StripeSignUp.propTypes = {
  stripeURL: PropTypes.string.isRequired,
};

export default StripeSignUp;
