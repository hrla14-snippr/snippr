import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import PropTypes from 'prop-types';
import ClientChat from './ClientChat';
import Header from '../components/PageElements/Header';
import SideBar from '../components/PageElements/SideBar';
import Footer from '../components/PageElements/Footer';

class ProfilePage extends Component {

  constructor(props) {
    super(props);
    console.log('snyppr', props.snyppr);
    this.state = {
      togglePortfolio: true,
      chatVisible: false,
      charge: 1000,
    };
    this.toggleChat = this.toggleChat.bind(this);
    this.onToken = this.onToken.bind(this);
    this.updateCharge = this.updateCharge.bind(this);
  }

  onToken(token) {
    axios.post('/transaction', {
      token,
      stripeId: this.props.snyppr.snypprstripe.id,
      amount: this.state.charge,
      snypprId: this.props.snyppr.id,
      snypeeId: this.props.snypeeId,
    })
     .then((response) => {
       console.log('data is', response);
     });
  }

  toggleChat() {
    this.setState({
      portfolio: false,
    });
  }

  updateCharge(charge) {
    this.setState({ charge });
  }

  render() {
    return (
      <div className="profile">
        <Header />
        <div className="profile-box">
          <SideBar logout={this.props.logout} />
          <div className="profile-body">
            <h1>{this.props.snyppr.fname} {this.props.snyppr.lname}</h1>
            <p>{this.props.snyppr.address}</p>
            {/* <div className="portfolio"></div> */}
            <StripeCheckout
              token={this.onToken}
              stripeKey="pk_test_IhZuZuB7uOy8VF5pg4XA54Df"
              name={`${this.props.snyppr.fname} ${this.props.snyppr.lname}`}
              description="Snyppr Transaction"
              ComponentClass="div"
              panelLabel="Submit a payment"
              amount={this.state.charge}
              currency="USD"
              locale="us"
              email={this.props.email}
            />
            <ClientChat
              name={`${this.props.snyppr.fname}${this.props.snyppr.lname}`}
              updateCharge={this.updateCharge}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  snyppr: PropTypes.shape.isRequired,
  snypeeId: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  snyppr: state.currentSnyppr,
});

export default connect(mapStateToProps)(ProfilePage);
