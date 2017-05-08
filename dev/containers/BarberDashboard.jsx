import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BarberChat from './BarberChat';
import Header from '../components/PageElements/Header';
import BarberSideBar from '../components/PageElements/BarberSideBar';
import ReviewsList from '../components/ReviewsList';
import TransactionsList from '../components/TransactionsList';
import Footer from '../components/PageElements/Footer';

class BarberDashboard extends Component {
  constructor(props) {
    super(props);

    console.log('profile', props.profile);
    this.state = {
      name: `${this.props.profile.fname}${this.props.profile.lname}`,
      displayBarberChat: false,
      currentWindow: 'Reviews',
      work: [],
    };

    this.handleChatToggle = this.handleChatToggle.bind(this);
    this.changeWindow = this.changeWindow.bind(this);
  }
  handleChatToggle() {
    this.setState({ displayBarberChat: !this.state.displayBarberChat });
  }
  changeWindow(event) {
    this.setState({ currentWindow: event.target.value });
  }
  render() {
    return (
      <div className="profile">
        <Header />
        <div className="profile-box">
          <BarberSideBar changeWindow={this.changeWindow} logout={this.props.logout} />
          <div className="profile-body">
            <div className={this.state.currentWindow === 'Reviews' ? '' : 'hidden'}>
              <ReviewsList reviews={this.props.profile.snypprreviews || []} reviewer="snypee" />
            </div>
            <div className={this.state.currentWindow === 'Transactions' ? '' : 'hidden'}>
              <TransactionsList
                transactions={this.props.profile.transactions || []} target="Snypee"
              />
            </div>
            <div className="chatbox-container">
              <div className={this.state.displayBarberChat ? '' : 'hidden'}>
                <BarberChat name={this.state.name} />
              </div>
              <img
                onClick={this.handleChatToggle}
                alt="chat-svg" className="chat-svg" src="/public/assets/speech-bubble.svg"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

BarberDashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  profile: PropTypes.string.isRequired,
};

export default BarberDashboard;
