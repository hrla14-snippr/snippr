import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BarberChat from './BarberChat';
import Header from '../components/PageElements/Header';
import BarberSideBar from '../components/PageElements/BarberSideBar';
import Footer from '../components/PageElements/Footer';
import S3Uploader from '../components/S3Uploader';

class BarberDashboard extends Component {
  constructor(props) {
    super(props);

    console.log('profile', props.profile);
    this.state = {
      name: `${this.props.profile.fname}${this.props.profile.lname}`,
      displayBarberChat: false,
    };

    this.handleChatToggle = this.handleChatToggle.bind(this);
  }

  handleChatToggle() {
    this.setState({ displayBarberChat: !this.state.displayBarberChat });
  }

  render() {
    return (
      <div className="profile">
        <Header />
        <div className="profile-box">

          <BarberSideBar logout={this.props.logout} />
          <div className="profile-body">
            <h1>{this.state.name}</h1>
            <p>some address</p>
            <div className="chatbox-container">
              <div className={this.state.displayBarberChat ? '' : 'hidden'}>
                <BarberChat name={this.state.name} />
                <S3Uploader authId={this.props.profile.id} />
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
