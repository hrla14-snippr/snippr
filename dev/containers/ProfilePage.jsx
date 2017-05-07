import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      displayClientChat: false,
    };
    this.handleChatToggle = this.handleChatToggle.bind(this);
  }

  handleChatToggle() {
    this.setState({ displayClientChat: !this.state.displayClientChat });
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
            <div className={this.state.displayClientChat ? 'chat-position' : 'hidden'}>
              <ClientChat
                snyppr={this.props.snyppr}
                name={`${this.props.snyppr.fname} ${this.props.snyppr.lname}`}
                email={this.props.email}
              />
            </div>
            <img
              onClick={this.handleChatToggle}
              alt="chat-svg" className="chat-svg" src="/public/assets/speech-bubble.svg"
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
  logout: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  snyppr: state.currentSnyppr,
});

export default connect(mapStateToProps)(ProfilePage);
