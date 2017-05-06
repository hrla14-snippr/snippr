import React, { Component } from 'react';

class SideBar extends Component {
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
      </div>
    </div>
    );
  }
}


export default SideBar;

