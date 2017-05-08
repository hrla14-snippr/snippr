import React, { Component } from 'react';
import PropTypes from 'prop-types';

const axios = require('axios');

class BarberSideBar extends Component {
  constructor(props) {
    super(props);
    this.getImages = this.getImages.bind(this);
  }
  getImages() {
    console.log(this.props.authId);
    const endpoint = '/images/' + this.props.authId
    axios.get(endpoint)
    .then(res => {
      console.log(res);
    });
  }
  render() {
    return (<div className="sidebar">
      <div className="picturebox">
        <img className="userpic" alt="placeholderimage" src="https://timeforgeography.co.uk/static/img/avatar-placeholder.png" />
      </div>
      <div className="sidebarmenu">
        <div onClick={this.getImages} className="sidebar-items">Work</div>
        <div className="sidebar-items">Reviews</div>
        <div className="sidebar-items"><a href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_AZdNGhV2VUe0pilvxfh5jkNfsevELTNz&scope=read_write&redirect_uri=http://localhost:3000/stripeId">Payment Setup</a></div>
        <div onClick={this.props.logout} className="sidebar-items">Logout</div>
      </div>
    </div>
    );
  }
}

BarberSideBar.propTypes = {
  logout: PropTypes.func.isRequired,
  authId: PropTypes.string.isRequired,
};


export default BarberSideBar;
