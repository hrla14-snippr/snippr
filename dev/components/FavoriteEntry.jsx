import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ChangeSnyppr } from '../actions/ChangeSnyppr';

class FavoriteEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }
  deleteFavorite() {
    const favToDelete =
      JSON.stringify({ snypprId: this.props.favorite.id, snypeeId: this.props.snypeeId });
    console.log(favToDelete, 'fav to delete ');
    axios.delete(`/favorites/${favToDelete}`)
      .then((response) => {
        if (response.data) {
          this.props.fetchFavorites();
        } else {
          console.log('something went wrong fetching favorites');
        }
      })
      .catch((err) => {
        console.log('error deleting favorites , heres the error ', err);
      });
  }
  render() {
    return (
      <Link to="/snypprProfile">
        <div onClick={() => this.props.ChangeSnyppr(this.props.favorite)} className="snypprentry">
          <div className="entryimg">
            <img
              className="miniprofilepic"
              alt="placeholder"
              src={this.props.favorite.profilepic
                  ? this.props.favorite.profilepic.url
                  : 'https://timeforgeography.co.uk/static/img/avatar-placeholder.png'}
              height="50px"
              width="50px"
            />
          </div>
          <div>
            <h1 className="entryheader">{this.props.favorite.fname} {this.props.favorite.lname}</h1>
          </div>
          <div className="deletefav">
            <button
              onClick={(e) => {
                e.stopPropagation();
                this.deleteFavorite();
              }} className="delbut"
            ><img
              alt="unfavorite"
              src="https://cdn1.iconfinder.com/data/icons/love-icons/512/broken-heart-512.png"
              height="30px" width="30px"
            /></button>
          </div>
        </div>
      </Link>
    );
  }
}

FavoriteEntry.propTypes = {
  favorite: PropTypes.shape.isRequired,
  ChangeSnyppr: PropTypes.func.isRequired,
  snypeeId: PropTypes.string.isRequired,
  fetchFavorites: PropTypes.func.isRequired,
};


export default connect(null, { ChangeSnyppr })(FavoriteEntry);
