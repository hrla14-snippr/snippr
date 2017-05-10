import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
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
        if (response.data === 'created already') {
          notify.show('already in your favorites!!', 'error');
        } else {
          notify.show('added to favorites!', 'success');
        }
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
        <button
          onClick={this.props.changeWindow}
          value="Portfolio" className="navmenu-items"
        >Portfolio</button>
        <button
          onClick={this.props.changeWindow} value="Reviews" className="navmenu-items"
        >Reviews</button>
        <div onClick={this.handleFav} className="navmenu-items svgcontainer">
          <FavoriteIcon />
        </div>
        <div onClick={this.props.logout} href="#" className="sidebar-items">Logout</div>
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
  logout: PropTypes.func.isRequired,
  changeWindow: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(SideBar);
