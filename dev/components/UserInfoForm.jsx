import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/PageElements/Header';
import Footer from '../components/PageElements/Footer';

class UserInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const stripeURL = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_AZdNGhV2VUe0pilvxfh5jkNfsevELTNz&scope=read_write&redirect_uri=http://localhost:3000/stripeId&state=${this.props.authId}`;
    return (
      (this.props.accountType === 'Snyppr' && this.props.hasProfile && !this.props.hasStripeId)
      ? <div className="stripesignup">
        <div className="formheader">Sign up for a Stripe Account</div>
        <p>You will need a Stripe Account to continue using our service.
          <a href={stripeURL}> Click on the link</a> to sign up for an account!</p>
      </div>
      : <div>
        <Header />
        <div className="form-body">
          <form className="userinfo" onSubmit={this.props.submitUserInfo} >
            <div className="formheader"><h1>Tell Us More!</h1></div>
            <div className="inputbox">
              <div className="forminputs">
                <input
                  className="leftin" type="text"
                  name="fname" placeholder="First Name" required
                />
                <input
                  className="rightin" type="text"
                  name="lname" placeholder="Last Name" required
                />
              </div>
              <div className="midinput">
                <input
                  className="midin"
                  type="text" name="address"
                  placeholder="Address" required
                />
              </div>
              <input className="hairstyles" type="submit" value="Submit" />
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

UserInfoForm.propTypes = {
  submitUserInfo: PropTypes.func.isRequired,
  authId: PropTypes.string.isRequired,
  hasProfile: PropTypes.bool.isRequired,
  accountType: PropTypes.string.isRequired,
  hasStripeId: PropTypes.bool.isRequired,
};

export default UserInfoForm;
