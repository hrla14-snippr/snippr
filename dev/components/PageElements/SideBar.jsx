import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FavoriteIcon from './FavoriteIcon';

const axios = require('axios');

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.handleFav = this.handleFav.bind(this);
  }

  handleFav() {
    console.log('inside handleFav click');

    const snypeeId = JSON.parse(window.localStorage.profile).user_id;
    const snypprId = this.props.snypprId.id;
    axios.post('/favorites', {
      snypprId,
      snypeeId,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (<div className="sidebar">
      <div className="picturebox">
        <img className="userpic" alt="placeholderimage" src="https://timeforgeography.co.uk/static/img/avatar-placeholder.png" />
      </div>
      <div className="sidebarmenu">
        <div className="sidebar-items">Work</div>
        <div className="sidebar-items">Reviews</div>
        <div onClick={this.handleFav} className="sidebar-items svgcontainer">
          <FavoriteIcon />
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  snypprId: state.currentSnyppr,
});

SideBar.propTypes = {
  snypprId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(SideBar);
