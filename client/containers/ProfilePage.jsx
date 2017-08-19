import React, { Component } from 'react';
import axios from 'axios';
import Notifications from 'react-notify-toast';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ClientChat from './ClientChat';
import SnypprReviewsList from '../components/SnypprReviewsList';
import PortfolioList from '../components/PortfolioList';
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
      currentWindow: 'Reviews',
      barberImages: [],
      certificatePic: '',
    };
    this.handleChatToggle = this.handleChatToggle.bind(this);
    this.changeWindow = this.changeWindow.bind(this);
    this.getBarberImages = this.getBarberImages.bind(this);
    this.fetchCertificate = this.fetchCertificate.bind(this);
  }
  // Fetches certificate of the barber the client is looking at
  componentDidMount() {
    this.fetchCertificate();
  }
  getBarberImages() {
    const barberId = this.props.snyppr.id;
    const endpoint = `/images/${barberId}`;
    axios.get(endpoint)
    .then((res) => {
      console.log(res.data);
      const arr = [];
      res.data.forEach((image) => {
        arr.push(image.url);
      });
      console.log(arr);
      this.setState({ barberImages: arr });
    });
  }
  handleChatToggle() {
    this.setState({ displayClientChat: !this.state.displayClientChat });
  }
  changeWindow(event) {
    this.setState({ currentWindow: event.target.value });
    if (event.target.value === 'Portfolio') {
      this.getBarberImages();
    }
  }
  // Fetches the certificate from the db for the snyppr the snypee is looking at
  fetchCertificate() {
    axios.get(`/verify/${this.props.snyppr.id}`)
         .then((res) => {
           console.log(res);
           this.setState({ certificatePic: res.data.url });
         })
         .catch((err) => {
           console.log(err);
         });
  }
  // Added image for certificate pic on line 87
  render() {
    console.log('this is the barbers images state ', this.state);
    return (
      <div className="profile">
        <Notifications />
        <Header />
        <div className="profile-box">
          <SideBar
            changeWindow={this.changeWindow}
            snyppr={this.props.snyppr} logout={this.props.logout}
          />
          <div className=" profile-body">
            <div className={this.state.currentWindow === 'Reviews' ? '' : 'hidden'}>
              <SnypprReviewsList
                reviews={this.props.snyppr.snypprreviews}
              />
            </div>
            <div className={this.state.currentWindow === 'Portfolio' ? '' : 'hidden'}>
              <img className="certificatePic" src={this.state.certificatePic} />
              <PortfolioList images={this.state.barberImages || []} />
            </div>
            <div className="chatbox-container">
              <div className={this.state.displayClientChat ? 'chat-position' : 'hidden'}>
                <ClientChat
                  profile={this.props.profile}
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
