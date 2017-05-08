import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from '../components/PageElements/Header';
import Footer from '../components/PageElements/Footer';

class UserInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { styles: [] };
  }

  componentDidMount() {
    const context = this;

    axios.get('/styles')
      .then(({ data }) => context.setState({ styles: data }))
      .catch(e => console.log('error fetching styles: ', e));
  }

  render() {
    const stripeURL = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_AZdNGhV2VUe0pilvxfh5jkNfsevELTNz&scope=read_write&redirect_uri=http://localhost:3000/stripeId&state=${this.props.authId}`;
    return (
      (this.props.accountType === 'Snyppr' && this.props.hasProfile && !this.props.hasStripeId)
      ? <div>
        <a href={stripeURL}>
          Sign up for a Stripe Account
        </a>
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
              <div className="hairholder">
                {this.state.styles.map(({ style }, idx) => (
                  <div className="hairstyles">
                    <label htmlFor={style}>
                      <input
                        type="checkbox"
                        id={idx + 1} name={style} value={style}
                      />
                      {style}
                    </label>
                  </div>
                  ))}
                <input className="hairstyles" type="submit" value="Submit" />
              </div>
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
