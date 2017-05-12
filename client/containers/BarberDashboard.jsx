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
// import cheerio from 'cheerio'


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
      certificatePic: '',
      resultImageUrl: '',
      resultImage: {
        anger: null,
        joy: null,
        sorrow: null,
        surprise: null,
      },
    };

    this.handleChatToggle = this.handleChatToggle.bind(this);
    this.changeWindow = this.changeWindow.bind(this);
    this.getImages = this.getImages.bind(this);
    this.getVerified = this.getVerified.bind(this);
    this.getResults = this.getResults.bind(this);
    this.certificateVerified = this.certificateVerified.bind(this);
  }

  componentDidMount() {
    axios.get(`/verify/${this.props.profile.id}`)
         .then((res) => {
          this.setState({ certificatePic: res.data.url})
         })
         .catch((err) => {
           console.log(err)
         })
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
    if (event.target.value === 'Portfolio') {
      this.getImages();
    }
  }
  getVerified() {
    axios.get(`/verify/${this.props.profile.id}`)
         .then((res) => {
           console.log(res)
           const image = encodeURIComponent(res.data.url);
           this.setState({ certificatePic: res.data.url})
           return axios.post(`/cloudText/${image}`)
         })
        .then((response) => {
          console.log(response);
          console.log(this.certificateVerified(response.data));
        })
        .catch(err => {
          console.log(err);
        })
  }
  certificateVerified(words) {
    const keyWords = ['CERTIFICATE', 'BARBER', 'COSMETOLOGY', 'HAIRCUTTER', 'BEAUTY']
    return _.some(words, (word) => {
      return keyWords.includes(word.toUpperCase());
    });
  }
  getResults(){
    console.log('we in getresults', this.props.profile.id)
    axios.get(`/analyze/${this.props.profile.id}`)
         .then((res) => {
           const image = encodeURIComponent(res.data.url);
           this.setState({ resultImageUrl: res.data.url })
           console.log(this.state.resultImageUrl)
           return axios.post(`/cloudFaces/${image}`)
         })
        .then((response) => {
          console.log(response);
          this.setState({
            resultImage: {
              anger: response.data[0].angerLikelihood,
              joy: response.data[0].joyLikelihood,
              sorrow: response.data[0].sorrowLikelihood,
              surprise: response.data[0].surpriseLikelihood,
            }
          })
          // console.log(this.certificateVerified(response.data));
        })
        .catch(err => {
          console.log(err);
        })
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
                <img className="certificatePic" src={this.state.certificatePic}/>
                <br />
                <Button onClick={this.getVerified} bsStyle="primary">
                  Get Verified
                </Button>
              </center>
            </div>
            <div className={this.state.currentWindow === 'Train' ? '' : 'hidden'}>
              <center>
                <S3Uploader
                  authId={this.props.profile.id}
                  action="resultpic"
                  type="snyppr"
                />
                <br />
                <img className="resultImage" src={this.state.resultImageUrl} />
                <div>
                  <div>Anger: {this.state.resultImage.anger}</div>
                  <div>Joy: {this.state.resultImage.joy}</div>
                  <div>Sorrow: {this.state.resultImage.sorrow}</div>
                  <div>Surprise: {this.state.resultImage.surprise}</div>
                </div>
                <br />
                <br />
                <Button onClick={this.getResults} bsStyle="primary">
                  Get Results
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
