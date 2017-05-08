import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import GoogleMaps from '../components/GoogleMaps';
import SnypprList from '../components/SnypprList';
import ReviewsList from '../components/ReviewsList';
import FavoriteList from '../components/FavoriteList';
import TransactionsList from '../components/TransactionsList';
import Header from '../components/PageElements/Header';
import Footer from '../components/PageElements/Footer';
import { CurrentFavorites } from '../actions/CurrentFavorites';
import S3Uploader from '../components/S3Uploader';

class ClientDashboard extends Component {
  constructor(props) {
    super(props);
    const profilePic = this.props.profile.profilepic ? this.props.profile.profilepic.url : 'https://timeforgeography.co.uk/static/img/avatar-placeholder.png';
    this.state = {
      nearbySnypprs: [],
      clientAddress: { lat: props.profile.lat, lng: props.profile.lng },
      favorites: [],
      currentWindow: 'Nearby',
      profilePic,
    };
    this.handleToggle = this.handleToggle.bind(this);
    // this.openProfilePicModal = this.openProfilePicModal.bind(this);
  }

  componentDidMount() {
    this.fetchSnypprs(JSON.stringify(this.state.clientAddress));
    this.fetchFavorites();
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
            <div className={['Reviews', 'ProfilePic', 'Transactions'].includes(this.state.currentWindow) ? 'hidden' : ''}>
              <GoogleMaps
                clientAddress={this.state.clientAddress}
                snypprs={this.state.nearbySnypprs}
                google={window.google}
              />
            </div>
            <div className={this.state.currentWindow === 'Nearby' ? '' : 'hidden'}>
              <SnypprList snypprs={this.state.nearbySnypprs} />
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
