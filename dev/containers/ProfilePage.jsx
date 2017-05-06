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
    this.state = {
      portfolio: true,
      chatVisible: false,
    };
    this.toggleChat = this.toggleChat.bind(this);
  }

  toggleChat() {
    this.setState({
      portfolio: false,
    });
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
            <button>Stripe</button>
            <ClientChat name={`${this.props.snyppr.fname}${this.props.snyppr.lname}`} />
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
};

const mapStateToProps = state => ({
  snyppr: state.currentSnyppr,
});

export default connect(mapStateToProps)(ProfilePage);
