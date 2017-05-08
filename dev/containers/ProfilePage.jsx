import React, { Component } from 'react';
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
    console.log('snyppr', props.snyppr);
    this.state = {
      togglePortfolio: true,
      chatVisible: false,
      favorited: false,
    };
    this.toggleChat = this.toggleChat.bind(this);
  }
  toggleChat() {
    this.setState({
      portfolio: false,
    });
  }

  render() {
    console.log(this.props, 'these are the current props that the client has access to inside of props');
    return (
      <div className="profile">
        <Header />
        <div className="profile-box">
          <SideBar snyppr={this.props.snyppr} logout={this.props.logout} />
          <div className="profile-body">
            <h1>{this.props.snyppr.fname} {this.props.snyppr.lname}</h1>
            <p>{this.props.snyppr.address}</p>
            <SnypprReviewsList reviews={this.props.snyppr.snypprreviews} />
            <ClientChat
              snypeeId={this.props.profile.id}
              snyppr={this.props.snyppr}
              name={`${this.props.snyppr.fname}${this.props.snyppr.lname}`}
              email={this.props.email}
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
  profile: PropTypes.shape.isRequired,
};

const mapStateToProps = state => ({
  snyppr: state.currentSnyppr,
});

export default connect(mapStateToProps)(ProfilePage);
