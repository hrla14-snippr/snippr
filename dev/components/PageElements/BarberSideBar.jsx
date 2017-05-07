import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BarberSideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="sidebar">
      <div className="picturebox">
        <img className="userpic" alt="placeholderimage" src="https://timeforgeography.co.uk/static/img/avatar-placeholder.png" />
      </div>
      <div className="sidebarmenu">
        <div className="sidebar-items">Work</div>
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
};


export default BarberSideBar;
