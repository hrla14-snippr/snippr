import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BarberChat from './BarberChat';
import Header from '../components/PageElements/Header';
import BarberSideBar from '../components/PageElements/BarberSideBar';
import ReviewsList from '../components/ReviewsList';
import TransactionsList from '../components/TransactionsList';
import Footer from '../components/PageElements/Footer';
import S3Uploader from '../components/S3Uploader';

const axios = require('axios');

class BarberDashboard extends Component {
  constructor(props) {
    super(props);

    console.log('profile', props.profile);
    this.state = {
      name: `${this.props.profile.fname}${this.props.profile.lname}`,
      displayBarberChat: false,
      currentWindow: 'Reviews',
      reviews: [],
      transactions: [],
      work: [],
      images: [],
    };

    this.handleChatToggle = this.handleChatToggle.bind(this);
    this.changeWindow = this.changeWindow.bind(this);
    this.getImages = this.getImages.bind(this);
  }
  getImages() {
    console.log(this.props.profile.id);
    const endpoint = `/images/${this.props.profile.id}`;
    axios.get(endpoint)
    .then((res) => {
      console.log(res.data);
      const arr = [];
      res.data.forEach((image) => {
        arr.push(image.url);
      });
      console.log(arr);
      this.setState({ images: arr });
    });
  }
  handleChatToggle() {
    this.setState({ displayBarberChat: !this.state.displayBarberChat });
  }
  changeWindow(event) {
    this.setState({ currentWindow: event.target.value });
    if (event.target.value === 'Upload') {
      this.getImages();
    }
  }
  render() {
    return (
      <div className="profile">
        <Header />
        <div className="profile-box">
          <BarberSideBar changeWindow={this.changeWindow} logout={this.props.logout} />
          <div className="profile-body">
            <div className="profileheader">
              <h1 className="entryheader">{this.state.name}</h1>
              <p>some address</p>
            </div>
            <div className={this.state.currentWindow === 'Reviews' ? '' : 'hidden'}>
              <ReviewsList reviews={this.state.reviews} />
            </div>
            <div className={this.state.currentWindow === 'Transactions' ? '' : 'hidden'}>
              <TransactionsList transactions={this.state.transactions} />
            </div>
            <div className={this.state.currentWindow === 'Upload' ? '' : 'hidden'}>
              <center><S3Uploader authId={this.props.profile.id} /></center>

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
