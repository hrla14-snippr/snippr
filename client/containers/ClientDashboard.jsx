import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Form, FormControl, FormGroup, ControlLabel, Button, ButtonControl } from 'react-bootstrap';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import GoogleMaps from '../components/GoogleMaps';
import SnypprList from '../components/SnypprList';
import ReviewsList from '../components/ReviewsList';
import FavoriteList from '../components/FavoriteList';
import TransactionsList from '../components/TransactionsList';
import PerfectList from '../components/PerfectList';
import Header from '../components/PageElements/Header';
import Footer from '../components/PageElements/Footer';
import { CurrentFavorites } from '../actions/CurrentFavorites';
import S3Uploader from '../components/S3Uploader';

class ClientDashboard extends Component {
  constructor(props) {
    super(props);
    const profilePic = this.props.profile.profilepic ? this.props.profile.profilepic.url : 'https://timeforgeography.co.uk/static/img/avatar-placeholder.png';
    this.state = {
      text: '',
      nearbySnypprs: [],
      allSnypprs: [],
      clientAddress: { lat: props.profile.lat, lng: props.profile.lng },
      favorites: [],
      currentWindow: 'Nearby',
      profilePic,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleText = this.handleText.bind(this);
    this.analyzePersonality = this.analyzePersonality.bind(this);
    this.fetchAllSnypprs = this.fetchAllSnypprs.bind(this);
    // this.openProfilePicModal = this.openProfilePicModal.bind(this);
  }

  componentDidMount() {
    console.log('CLIENT DASHBOARD', this.props.profile)
    this.fetchSnypprs(JSON.stringify(this.state.clientAddress));
    this.fetchFavorites();
    this.fetchAllSnypprs();
  }

  fetchAllSnypprs() {
    axios.get('/fetchAllSnypprs')
         .then((data) => {
           console.log(data);
           this.setState({ allSnypprs: [...this.state.allSnypprs, ...data.data] });
         })
         .catch((err) => {
           console.log(err);
         })
  }
  fetchSnypprs(address) {
    axios.get(`/nearbySnypprs/${address}`)
      .then((results) => {
        this.setState({ nearbySnypprs: results });
      })
      .catch((err) => {
        console.log('error fucked up ', err);
      });
  }

  fetchFavorites() {
    axios.get(`/favorites/${this.props.profile.id}`)
      .then((favorites) => {
        this.setState({ favorites }, () => {
          this.props.CurrentFavorites(this.state.favorites);
        });
      })
      .catch((err) => {
        console.log('you fucked up fetching your favorites, heres the error ', err);
      });
  }

  handleToggle(event) {
    this.setState({ currentWindow: event.target.value });
    console.log(event);
  }

  analyzePersonality(event) {
    event.preventDefault();
    if (this.state.text.split(' ').length < 100) {
      swal({
        title: "We need atleast 100 words minimum!",
        text: "You have " + (100 - this.state.text.split(' ').length) + " words left!",
        type: "error"
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
          return axios.put(`/updateSnypee/${this.props.profile.id}`, {
            personality: res.data.personality[2].percentile,
          });
        })
        .then(data => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  handleText(event) {
    event.preventDefault();
    this.setState({ text: event.target.value });
  }
  render() {
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div className="dashboard">
        <Header />
        <div className="dashboard-box">
          <div className="navigation">
            <div className="picturebox">
              <img
                // onClick={this.openProfilePicModal}
                className="userpic"
                value="ProfilePic"
                alt="placeholderimage"
                src={this.state.profilePic}
              />
            </div>
            <div className="navmenu">
              <button
                onClick={this.handleToggle} value="Reviews"
                className="navmenu-items"
              >Reviews</button>
              <button
                onClick={this.handleToggle} value="Nearby"
                className="navmenu-items"
              >Nearby Snypprs</button>
              <button
                onClick={this.handleToggle} value="Perfect"
                className="navmenu-items"
              >Find Your Perfect Barber</button>
              <button
                onClick={this.handleToggle} value="Favorites"
                className="navmenu-items"
              >Favorites</button>
              <button
                onClick={this.handleToggle} value="Transactions" className="navmenu-items"
              >Transactions</button>
              <button
                onClick={this.props.logout}
                className="navmenu-items"
                value="Logout"
              >Logout</button>
            </div>
          </div>
          <div className="right-box">
            <div className={['Reviews', 'ProfilePic', 'Transactions', 'Perfect'].includes(this.state.currentWindow) ? 'hidden' : ''}>
              <GoogleMaps
                clientAddress={this.state.clientAddress}
                snypprs={this.state.nearbySnypprs}
                google={window.google}
              />
            </div>
            <div className={this.state.currentWindow === 'Nearby' ? '' : 'hidden'}>
              <SnypprList snypprs={this.state.nearbySnypprs} />
            </div>
            <div style={{ textAlign: 'center' }} className={this.state.currentWindow === 'Perfect' ? '' : 'hidden'}>
              <br /><br />
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Tell Us About Yourself</ControlLabel>
                <FormControl onChange={this.handleText} componentClass="textarea" placeholder="Tell Us About Yourself" />
              </FormGroup>
              <Button onClick={this.analyzePersonality} bsStyle="primary">
                Who Are You...
              </Button>
              <PerfectList profile={this.props.profile} snypprs={this.state.allSnypprs} />
            </div>
            <div className={this.state.currentWindow === 'Favorites' ? '' : 'hidden'}>
              <FavoriteList
                snypeeId={this.props.profile.id}
                fetchFavorites={this.fetchFavorites}
                favorites={this.state.favorites}
              />
            </div>
            <div className={this.state.currentWindow === 'ProfilePic' ? '' : 'hidden'}>
              <center><S3Uploader
                authId={this.props.profile.id}
                action="profilepic"
                type="snypee"
              /></center>
            </div>
            <div className={this.state.currentWindow === 'Reviews' ? '' : 'hidden'}>
              <ReviewsList reviews={this.props.profile.snypeereviews || []} reviewer="snyppr" />
            </div>
            <div className={this.state.currentWindow === 'Transactions' ? '' : 'hidden'}>
              <TransactionsList
                transactions={this.props.profile.transactions || []} target="Snyppr"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

ClientDashboard.propTypes = {
  profile: PropTypes.shape.isRequired,
  logout: PropTypes.func.isRequired,
  CurrentFavorites: PropTypes.func.isRequired,
};

export default connect(null, { CurrentFavorites })(ClientDashboard);
