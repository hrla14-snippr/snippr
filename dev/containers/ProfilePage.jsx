import React, { Component } from 'react';
import Notifications from 'react-notify-toast';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ClientChat from './ClientChat';
import SnypprReviewsList from '../components/SnypprReviewsList';
import Header from '../components/PageElements/Header';
import SideBar from '../components/PageElements/SideBar';
import Footer from '../components/PageElements/Footer';

class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      togglePortfolio: true,
      favorited: false,
      displayClientChat: false,
    };
    this.handleChatToggle = this.handleChatToggle.bind(this);
  }

  handleChatToggle() {
    this.setState({ displayClientChat: !this.state.displayClientChat });
  }

  render() {
    console.log(this.props, 'these are the current props that the client has access to inside of props');
    return (
      <div className="profile">
        <Notifications />
        <Header />
        <div className="profile-box">
          <SideBar snyppr={this.props.snyppr} logout={this.props.logout} />
          <div className=" profile-body">
            <div className="profileheader">
              <h1 className="entryheader">{this.props.snyppr.fname} {this.props.snyppr.lname}</h1>
              <p>{this.props.snyppr.address}</p>
            </div>
            <SnypprReviewsList reviews={this.props.snyppr.snypprreviews} />
            <div className="chatbox-container">
              <div className={this.state.displayClientChat ? 'chat-position' : 'hidden'}>
                <ClientChat
                  snypeeId={this.props.profile.id}
                  snyppr={this.props.snyppr}
                  name={`${this.props.snyppr.fname}${this.props.snyppr.lname}`}
                  email={this.props.email}
                />
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

ProfilePage.propTypes = {
  snyppr: PropTypes.shape.isRequired,
  logout: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  profile: PropTypes.shape.isRequired,
};

const mapStateToProps = state => ({
  snyppr: state.currentSnyppr,
});

export default connect(mapStateToProps)(ProfilePage);
