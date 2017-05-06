import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

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
        <button>Click here when done</button>
      </div>
      : <form onSubmit={this.props.submitUserInfo} >
        <input type="text" name="fname" placeholder="First Name" required />
        <input type="text" name="lname" placeholder="Last Name" required />
        <input type="text" name="address" placeholder="Address" required />
        {this.state.styles.map(({ style }, idx) => (
          <label htmlFor={style}>
            <input type="checkbox" id={idx + 1} name={style} value={style} />
            {style}
          </label>
        ))}
        <input type="submit" value="Submit" />
      </form>
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
