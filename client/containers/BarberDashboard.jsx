import React, { Component } from 'react';
import { Form, FormControl, FormGroup, ControlLabel, Button, ButtonControl } from 'react-bootstrap';
import swal from 'sweetalert';
import axios from 'axios';
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
      text: '',
    };

    this.handleChatToggle = this.handleChatToggle.bind(this);
    this.changeWindow = this.changeWindow.bind(this);
    this.getImages = this.getImages.bind(this);
    this.getVerified = this.getVerified.bind(this);
    this.getResults = this.getResults.bind(this);
    this.certificateVerified = this.certificateVerified.bind(this);
    this.handleText = this.handleText.bind(this);
    this.analyzePersonality = this.analyzePersonality.bind(this);
  }

  componentDidMount() {
    axios.get(`/verify/${this.props.profile.id}`)
         .then((res) => {
           this.setState({ certificatePic: res.data.url });
         })
         .catch((err) => {
           console.log(err);
         });
  }

  getImages() {
    console.log(this.props.profile.id);
    const endpoint = `/images/${this.props.profile.id}`;
    axios.get(endpoint)
    .then((res) => {
      const arr = [];
      res.data.forEach((image) => {
        arr.push(image.url);
      });
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
  // J6K Changes
  // Verifies if the certificate they just put in is valid or not
  getVerified() {
    axios.get(`/verify/${this.props.profile.id}`)
         .then((res) => {
           console.log(res);
           const image = encodeURIComponent(res.data.url);
           this.setState({ certificatePic: res.data.url });
           return axios.post(`/cloudText/${image}`);
         })
        .then((response) => {
          console.log(response);
          if (this.certificateVerified(response.data) === true) {
            axios.put(`/certified/${this.props.profile.id}`);
            swal({
              title: 'Congratulations!',
              text: 'Your certificate was validated!',
              type: 'success',
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
  }
  // Helper function to check if a few key words exist in the scanned doc
  certificateVerified(words) {
    const upperCase = (word) => {
      return word.toUpperCase();
    };
    const upperWords = words.map(upperCase);
    return (upperWords.includes('CERTIFICATE') || upperWords.includes('LICENSE')) && (words.includes('BARBER') || words.includes('BARBERS') || words.includes('COSMETOLOGY') || words.includes('BEAUTY') || words.includes('HAIRCUTTER'))
  }
  // Analyzes client result picture to see how happy they were about their cut
  getResults(){
    console.log('we in getresults', this.props.profile.id)
    axios.get(`/analyze/${this.props.profile.id}`)
         .then((res) => {
           const image = encodeURIComponent(res.data.url);
           this.setState({ resultImageUrl: res.data.url });
           return axios.post(`/cloudFaces/${image}`);
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
          });
        })
        .catch(err => {
          console.log(err);
        });
  }
  // Anaylzes Personality of the Barber and stores it into the database
  analyzePersonality(event) {
    event.preventDefault();
    if (this.state.text.split(' ').length < 100) {
      swal({
        title: 'We need atleast 100 words minimum!',
        text: 'You have ' + (100 - this.state.text.split(' ').length) + ' words left!',
        type: 'error',
      });
    }
    axios.post(`/personality/${this.state.text}`)
         .then((res) => {
           console.log(res.data.personality[2].percentile);
           swal({
             title: "Personality Assessed!",
             text: "We Know All Your Secrets..",
             type: "success"
           });
           return axios.put(`/updateSnyppr/${this.props.profile.id}`, {
             personality: res.data.personality[2].percentile,
           });
         })
         .then((data) => {
           console.log(data);
         })
         .catch((err) => {
           console.log(err);
         })
  }
  // Just sets state of the text box for personality assessment
  handleText(event) {
    event.preventDefault();
    this.setState({ text: event.target.value });
  }
  // J6K Changes
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
                <br />
                <br />
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Tell Us About Yourself</ControlLabel>
                  <FormControl onChange={this.handleText} componentClass="textarea" placeholder="textarea" />
                </FormGroup>
                <Button onClick={this.analyzePersonality} bsStyle="primary">
                  Who Are You...
                </Button>
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
