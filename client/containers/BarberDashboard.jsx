import React, { Component } from 'react';
import { Form, Button, ButtonControl } from 'react-bootstrap';
import _ from 'underscore';
import PropTypes from 'prop-types';
import BarberChat from './BarberChat';
import Header from '../components/PageElements/Header';
import BarberSideBar from '../components/PageElements/BarberSideBar';
import ReviewsList from '../components/ReviewsList';
import TransactionsList from '../components/TransactionsList';
import PortfolioList from '../components/PortfolioList';
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
      work: [],
      images: [],
    };

    this.handleChatToggle = this.handleChatToggle.bind(this);
    this.changeWindow = this.changeWindow.bind(this);
    this.getImages = this.getImages.bind(this);
    this.getVerified = this.getVerified.bind(this);
    this.certificateVerified = this.certificateVerified.bind(this);
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
  getVerified() {
    console.log('we in getverified profile id', this.props.profile.id)
    console.log('we in getverified ', localStorage);
    axios.get(`/verify/${this.props.profile.id}`)
         .then((res) => {
           const image = encodeURIComponent(res.data.url);
           return axios.post(`/cloud/${image}`)
         })
        .then((response) => {
          console.log(response);
          console.log(this.certificateVerified(response.data));
        })
        .catch(err => {
          console.log(err);
        })
  }
  handleChatToggle() {
    this.setState({ displayBarberChat: !this.state.displayBarberChat });
  }
  changeWindow(event) {
    this.setState({ currentWindow: event.target.value });
    if (event.target.value === 'Portfolio') {
      this.getImages();
    }
  }
  certificateVerified(words) {
    const keyWords = ['CERTIFICATE', 'BARBER', 'COSMETOLOGY', 'HAIRCUTTER', 'BEAUTY']
    return _.some(words, (word) => {
      return keyWords.includes(word.toUpperCase());
    });
  }
  render() {
    return (
      <div className="profile">
        <Header />
        <div className="profile-box">
          <BarberSideBar
            changeWindow={this.changeWindow}
            logout={this.props.logout}
            profilePic={this.props.profile.profilepic ? this.props.profile.profilepic.url : 'https://timeforgeography.co.uk/static/img/avatar-placeholder.png'}
          />
          <div className="profile-body">
            <div className={this.state.currentWindow === 'Reviews' ? '' : 'hidden'}>
              <ReviewsList reviews={this.props.profile.snypprreviews || []} reviewer="snypee" />
            </div>
            <div className={this.state.currentWindow === 'Transactions' ? '' : 'hidden'}>
              <TransactionsList
                transactions={this.props.profile.transactions || []} target="Snypee"
              />
            </div>
            <div className={this.state.currentWindow === 'Portfolio' ? '' : 'hidden'}>
              <center>
                <S3Uploader
                  authId={this.props.profile.id}
                  action="upload"
                />
              </center>
            </div>
            <div className={this.state.currentWindow === 'Certification' ? '' : 'hidden'}>
              <center>
                <S3Uploader
                  authId={this.props.profile.id}
                  action="certificatepic"
                  type="snyppr"
                />
                <br />
                <Form>
                  <input type="text" placeholder="First Name" />
                  <br />
                  <input type="text" placeholder="Last Name" />
                  <br />
                </Form>
                <Button onClick={this.getVerified} bsStyle="primary">
                  Get Verified
                </Button>
              </center>
            </div>
            <div className={this.state.currentWindow === 'Upload' ? '' : 'hidden'}>
              <center>
                <S3Uploader
                  authId={this.props.profile.id}
                  action="profilepic"
                  type="snyppr"
                />
              </center>
              <PortfolioList images={this.state.barberImages || []} hide={this.state.currentWindow === 'Portfolio' ? '' : 'hidden'} />
            </div>
            <div className={`chatbox-container ${this.state.displayBarberChat ? '' : 'hidden'}`}>
              <div>
                <BarberChat name={this.state.name} />
              </div>
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

BarberDashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  profile: PropTypes.string.isRequired,
};

export default BarberDashboard;
