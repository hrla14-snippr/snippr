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

        <div className="sidebar-items svgcontainer">
          <svg viewBox="0 0 32 32" id="heart">
            <path
              id="heart-path" d="M16,28.261c0,0-14-7.926-14-17.046c0-9.356,
              13.159-10.399,14-0.454c1.011-9.938,14-8.903,14,0.454C30,20.335,
              16,28.261,16,28.261z"/>
          </svg>
        </div>


      </div>
    </div>
    );
  }
}


export default SideBar;

