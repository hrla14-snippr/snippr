import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BarberSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
    };

    this.changeActiveTab = this.changeActiveTab.bind(this);
  }

  changeActiveTab(idx) {
    console.log('active tab', idx);
    this.setState({ activeTab: idx });
  }

  render() {
    return (<div className="sidebar">
      <div className="picturebox">
        <img className="userpic" alt="placeholderimage" src="https://timeforgeography.co.uk/static/img/avatar-placeholder.png" />
      </div>
      <div className="sidebarmenu">
        <button
          onClick={(e) => {
            this.props.changeWindow(e);
            this.changeActiveTab(0);
          }}
          value="Work" className={`navmenu-items ${this.state.activeTab === 0 ? 'navmenu-active' : ''}`}
        >Work</button>
        <button
          onClick={(e) => {
            this.props.changeWindow(e);
            this.changeActiveTab(1);
          }}
          value="Reviews" className={`navmenu-items ${this.state.activeTab === 1 ? 'navmenu-active' : ''}`}
        >Reviews</button>
        <button
          className={`navmenu-items ${this.state.activeTab === 2 ? 'navmenu-active' : ''}`}
          onClick={(e) => {
            this.props.changeWindow(e);
            this.changeActiveTab(2);
          }} value="Transactions"
        >Transactions</button>
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
