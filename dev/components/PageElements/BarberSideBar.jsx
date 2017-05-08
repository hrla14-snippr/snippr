import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BarberSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (<div className="sidebar">
      <div className="picturebox">
        <img className="userpic" alt="placeholderimage" src="https://timeforgeography.co.uk/static/img/avatar-placeholder.png" />
      </div>
      <div className="sidebarmenu">
        <button
          onClick={this.props.changeWindow}
          value="Upload" className="navmenu-items"
        >Upload Work</button>
        <button
          onClick={this.props.changeWindow}
          value="Reviews" className="navmenu-items"
        >Reviews</button>
        <button
          className="navmenu-items"
          onClick={this.props.changeWindow} value="Transactions"
        >Transactions</button>
        <button
          onClick={this.props.changeWindow}
          value="Portfolio" className="navmenu-items"
        >Portfolio</button>
        <div onClick={this.props.logout} className="sidebar-items">Logout</div>
      </div>
    </div>
    );
  }
}

BarberSideBar.propTypes = {
  logout: PropTypes.func.isRequired,
  changeWindow: PropTypes.func.isRequired,
};


export default BarberSideBar;
